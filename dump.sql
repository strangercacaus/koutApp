CREATE FUNCTION public.create_exercise(p_title text, p_title_en text, p_equipment_id integer, p_type_id integer, p_image_url text, p_custom boolean, p_muscle_group_ids integer[]) RETURNS void
    LANGUAGE plpgsql
    AS $$DECLARE
    exercise_id INTEGER;
    muscle_group_id INTEGER;
BEGIN
    INSERT INTO public.exercise (title, title_en, equipment_id, type_id, image_url, custom)
    VALUES (p_title, p_title_en, p_equipment_id, p_type_id, p_image_url, p_custom)
    RETURNING id INTO exercise_id;

    FOREACH muscle_group_id IN ARRAY p_muscle_group_ids LOOP
        INSERT INTO public.exercise_muscle_group (exercise_id, muscle_group_id)
        VALUES (exercise_id, muscle_group_id);
    END LOOP;
END;$$;

CREATE FUNCTION public.create_workout_item(p_workout_plan_id integer, p_exercise_id integer, p_reps integer, p_sets integer, p_restpause integer, p_load integer, p_incline integer, p_condition text, p_order integer, p_duration integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO public.workout_item (
        workout_plan_id, exercise_id, reps, "sets",
        restpause, "load", incline, "condition", "order", duration
    ) VALUES (
        p_workout_plan_id,
        p_exercise_id,
        p_reps,
        p_sets,
        p_restpause,
        p_load,
        p_incline,
        p_condition,
        p_order,
        p_duration
    );

    -- Reordernar itens dentro do mesmo workout_plan_id
    PERFORM public.update_workout_item_order(p_workout_plan_id);
END;
$$;

CREATE FUNCTION public.delete_workout_item(p_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_workout_plan_id integer;  
BEGIN
    SELECT workout_plan_id INTO v_workout_plan_id
    FROM public.workout_item
    WHERE id = p_id;

    DELETE FROM public.workout_item WHERE id = p_id;

    PERFORM public.update_workout_item_order(v_workout_plan_id);

    RETURN v_workout_plan_id;
END;
$$;

CREATE FUNCTION public.save_workout_item(p_id integer, p_workout_plan_id integer, p_exercise_id integer, p_reps integer, p_sets integer, p_restpause integer, p_load integer, p_incline integer, p_condition text, p_order integer, p_duration integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Upsert logic: insert or update the workout_item
    INSERT INTO public.workout_item (
        id, workout_plan_id, exercise_id, reps, "sets",
        restpause, "load", incline, "condition", "order", duration
    ) VALUES (
        COALESCE(p_id, nextval('workout_option_item_id_seq'::regclass)),
        p_workout_plan_id,
        p_exercise_id,
        p_reps,
        p_sets,
        p_restpause,
        p_load,
        p_incline,
        p_condition,
        p_order,
        p_duration
    )
    ON CONFLICT (id) DO UPDATE
    SET
        workout_plan_id = EXCLUDED.workout_plan_id,
        exercise_id = EXCLUDED.exercise_id,
        reps = EXCLUDED.reps,
        "sets" = EXCLUDED."sets",
        restpause = EXCLUDED.restpause,
        "load" = EXCLUDED."load",
        incline = EXCLUDED.incline,
        "condition" = EXCLUDED."condition",
        "order" = EXCLUDED."order",
        duration = EXCLUDED.duration;

    -- Reorder items within the same workout_plan_id
    WITH ordered_items AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY workout_plan_id ORDER BY "order", updated_at desc, id) AS new_order
        FROM public.workout_item
        WHERE workout_plan_id = p_workout_plan_id
    )
    UPDATE public.workout_item
    SET "order" = ordered_items.new_order
    FROM ordered_items
    WHERE public.workout_item.id = ordered_items.id;

END;
$$;

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE FUNCTION public.update_exercise(p_id integer, p_title text, p_title_en text, p_equipment_id integer, p_type_id integer, p_image_url text, p_custom boolean, p_muscle_group_ids integer[]) RETURNS void
    LANGUAGE plpgsql
    AS $$DECLARE
    exercise_id INTEGER;
    muscle_group_id INTEGER;
BEGIN
    -- Atualiza o exercício
    UPDATE public.exercise
    SET title = p_title, 
        title_en = p_title_en,
        equipment_id = p_equipment_id,
        type_id = p_type_id,
        image_url = p_image_url,
        custom = p_custom
    WHERE id = p_id
    RETURNING id INTO exercise_id; -- Correção aqui, use p_id no WHERE e retorne o id atualizado

    -- Insere os músculos que não existem na tabela exercise_muscle
    IF p_muscle_group_ids IS NOT NULL AND array_length(p_muscle_group_ids, 1) > 0 THEN
        -- Insere os músculos que não existem na tabela exercise_muscle
        FOREACH muscle_group_id IN ARRAY p_muscle_group_ids LOOP
            INSERT INTO public.exercise_muscle_group (exercise_id, muscle_group_id)
            VALUES (exercise_id, muscle_group_id)
            ON CONFLICT DO NOTHING; -- Evita duplicação
        END LOOP;
    END IF;

    -- Remove os músculos que não estão mais associados ao exercício
    DELETE FROM public.exercise_muscle_group em
    WHERE em.exercise_id = p_id
    AND NOT em.muscle_group_id = ANY (p_muscle_group_ids); -- Correção aqui para usar 'ANY' e comparar o array de maneira correta
END;$$;

CREATE FUNCTION public.update_workout_item(p_id integer, p_workout_plan_id integer, p_exercise_id integer, p_reps integer, p_sets integer, p_restpause integer, p_load integer, p_incline integer, p_condition text, p_order integer, p_duration integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE public.workout_item
    SET
        workout_plan_id = p_workout_plan_id,
        exercise_id = p_exercise_id,
        "sets" = p_sets,
        reps = p_reps,
        restpause = p_restpause,
        "load" = p_load,
        incline = p_incline,
        "condition" = p_condition,
        "order" = p_order,
        duration = p_duration
	where id = p_id;
    -- Reorder items within the same workout_plan_id
    PERFORM public.update_workout_item_order(p_workout_plan_id);
END;
$$;

CREATE FUNCTION public.update_workout_item_order(p_workout_plan_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    WITH ordered_items AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY workout_plan_id ORDER BY "order", updated_at desc, id) AS new_order
        FROM public.workout_item
        WHERE workout_plan_id = p_workout_plan_id
    )
    UPDATE public.workout_item
    SET "order" = ordered_items.new_order
    FROM ordered_items
    WHERE public.workout_item.id = ordered_items.id;

END;
$$;


CREATE TABLE public.equipment (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title character varying(100) NOT NULL,
    description text,
    custom boolean DEFAULT false,
    image_url character varying,
    title_en character varying
);

CREATE TABLE public.execution (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    workout_plan_id integer,
    exercise_id integer,
    workout_option_id integer,
    workout_option_item_id integer,
    reps smallint,
    sets smallint,
    restpause integer,
    load double precision,
    incline integer,
    condition character varying,
    duration interval,
    session_id integer,
    manually_added boolean DEFAULT false
);

CREATE TABLE public.exercise (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    equipment_id integer,
    title character varying(100) NOT NULL,
    image_url text,
    title_en character varying,
    type_id integer,
    custom boolean DEFAULT false
);



CREATE TABLE public.exercise_muscle_group (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    exercise_id integer NOT NULL,
    muscle_group_id integer NOT NULL,
    image_url character varying
);

CREATE TABLE public.exercise_type (
    id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    title character varying,
    custom boolean DEFAULT false
);

CREATE TABLE public.muscle_group (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title character varying(100) NOT NULL,
    description text,
    title_en character varying
);

CREATE TABLE public.session (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    workout_option_id integer,
    workout_plan_id integer,
    title character varying(100) NOT NULL,
    started_at date,
    ended_at date,
    notes text
);


CREATE TABLE public.workout_item (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    workout_plan_id integer NOT NULL,
    exercise_id integer NOT NULL,
    reps smallint,
    sets smallint,
    restpause integer,
    load double precision,
    incline integer,
    condition character varying,
    "order" integer,
    duration integer
);

CREATE TABLE public.workout_plan (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title character varying(100) NOT NULL,
    description text,
    start_date date,
    end_date date,
    active boolean DEFAULT false NOT NULL,
    personal_trainer character varying
);


ALTER TABLE ONLY public.execution
    ADD CONSTRAINT execution_exercise_fk FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE RESTRICT;

ALTER TABLE ONLY public.execution
    ADD CONSTRAINT execution_session_fk FOREIGN KEY (session_id) REFERENCES public.session(id) ON DELETE RESTRICT;

ALTER TABLE ONLY public.execution
    ADD CONSTRAINT execution_workout_option_item_fk FOREIGN KEY (workout_option_item_id) REFERENCES public.workout_item(id) ON DELETE RESTRICT;

ALTER TABLE ONLY public.execution
    ADD CONSTRAINT execution_workout_plan_fk FOREIGN KEY (workout_option_id) REFERENCES public.workout_plan(id) ON DELETE RESTRICT;

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_equipment_fk FOREIGN KEY (equipment_id) REFERENCES public.equipment(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_exercise_type_fk FOREIGN KEY (type_id) REFERENCES public.exercise_type(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.exercise_muscle_group
    ADD CONSTRAINT exercise_muscle_group_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.exercise_muscle_group
    ADD CONSTRAINT exercise_muscle_group_muscle_group_fk FOREIGN KEY (muscle_group_id) REFERENCES public.muscle_group(id) ON DELETE RESTRICT;

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_workout_plan_fk FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id);

ALTER TABLE ONLY public.workout_item
    ADD CONSTRAINT workout_item_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plan(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.workout_item
    ADD CONSTRAINT workout_option_item_exercise_fk FOREIGN KEY (exercise_id) REFERENCES public.exercise(id) ON DELETE RESTRICT;


