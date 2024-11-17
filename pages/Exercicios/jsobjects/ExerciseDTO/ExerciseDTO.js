export default {
  exerciseDTO: {
		id: null,
		created_at: null,
		updated_at: null,
    title: null,
		title_en: null,
		equipment_id: null,
		muscle_id:null,
		type_id: null,
		image_url: null,
		custom: null
  },

  loadData(queryResult) {
    this.exerciseDTO.id = queryResult.id;
		this.exerciseDTO.created_at = queryResult.created_at;
		this.exerciseDTO.updated_at = queryResult.updated_at;
		this.exerciseDTO.title = queryResult.title;
		this.exerciseDTO.title_en = queryResult.title_en;
		this.exerciseDTO.equipment_id = queryResult.equipment_id;
		this.exerciseDTO.muscle_id = queryResult.muscle_id;
		this.exerciseDTO.type_id = queryResult.type_id;
		this.exerciseDTO.image_url = queryResult.image_url;
		this.exerciseDTO.custom = queryResult.custom;
  },

  saveDataFromUI(id, title, title_en, created_at, updated_at, equipment_id, muscle_id, type_id, image_url, custom) {
    this.exerciseDTO.id = id;
		this.exerciseDTO.created_at = created_at;
		this.exerciseDTO.updated_at = updated_at;
		this.exerciseDTO.title = title;
		this.exerciseDTO.title_en = title_en;
		this.exerciseDTO.equipment_id = equipment_id;
		this.exerciseDTO.muscle_id = muscle_id;
		this.exerciseDTO.type_id = type_id;
		this.exerciseDTO.image_url = image_url;
		this.exerciseDTO.custom = custom;
  },

  clearData() {
    this.exerciseDTO.id = null;
		this.exerciseDTO.created_at = null;
		this.exerciseDTO.updated_at = null;
		this.exerciseDTO.title = null;
		this.exerciseDTO.title_en = null;
		this.exerciseDTO.equipment_id = null;
		this.exerciseDTO.muscle_id = null;
		this.exerciseDTO.type_id = null;
		this.exerciseDTO.image_url = null;
		this.exerciseDTO.custom = null;
  },

  async save() {
    await CreateExercise.run({
			title: this.exerciseDTO.title,
			title_en: this.exerciseDTO.title_en,
			equipment_id: this.exerciseDTO.equipment_id,
			muscle_id: this.exerciseDTO.muscle_id,
			type_id: this.exerciseDTO.type_id,
			image_url: this.exerciseDTO.image_url,
			custom: this.exerciseDTO.custom
    });
  },
	
	  async update() {
    await UpdateExercise.run({
			id: this.exerciseDTO.id,
			title: this.exerciseDTO.title,
			title_en: this.exerciseDTO.title_en,
			equipment_id: this.exerciseDTO.equipment_id,
			muscle_id: this.exerciseDTO.muscle_id,
			type_id: this.exerciseDTO.type_id,
			image_url: this.exerciseDTO.image_url,
			custom: this.exerciseDTO.custom
    });
  },
	
		  async delete(id) {
    await DeleteExercise.run({
			id: id
    });
  }
	
}
