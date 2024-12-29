export default {
  workoutPlanDTO: {
		id: null,
    title: null,
		description: null,
		start_date: null,
		end_date:null,
		active: null,
		personal_trainer: null,
		plan_item_qty: null,
		plan_total_sets: null,
		plan_total_load: null
  },
	
  loadData(queryResult) {
    this.workoutPlanDTO.id = queryResult.id;
		this.workoutPlanDTO.title = queryResult.title;
		this.workoutPlanDTO.description = queryResult.description;
		this.workoutPlanDTO.start_date = queryResult.start_date;
		this.workoutPlanDTO.end_date = queryResult.end_date;
		this.workoutPlanDTO.active = queryResult.active;
		this.workoutPlanDTO.personal_trainer = queryResult.personal_trainer;
		this.workoutPlanDTO.plan_item_qty = queryResult.plan_item_qty;
		this.workoutPlanDTO.plan_total_sets = queryResult.plan_total_sets;
		this.workoutPlanDTO.plan_total_load = queryResult.plan_total_load;
  },

  saveDataFromUI(id, title, description, start_date, end_date, active, personal_trainer) {
    this.workoutPlanDTO.id = id;
		this.workoutPlanDTO.title = title;
		this.workoutPlanDTO.description = description;
		this.workoutPlanDTO.start_date = start_date;
		this.workoutPlanDTO.end_date = end_date;
		this.workoutPlanDTO.active = active;
		this.workoutPlanDTO.personal_trainer = personal_trainer
  },

  clearData() {
    this.workoutPlanDTO.id = null;
		this.workoutPlanDTO.title = null;
		this.workoutPlanDTO.description = null;
		this.workoutPlanDTO.start_date = null;
		this.workoutPlanDTO.end_date = null;
		this.workoutPlanDTO.active = null;
		this.workoutPlanDTO.personal_trainer = null;
		this.workoutPlanDTO.plan_item_qty = null;
		this.workoutPlanDTO.plan_total_sets = null;
		this.workoutPlanDTO.plan_total_load = null;
  },

  async save() {
    await CreateWorkoutPlan.run({
			title: this.workoutPlanDTO.title,
			description: this.workoutPlanDTO.description,
			start_date: this.workoutPlanDTO.start_date,
			end_date: this.workoutPlanDTO.end_date,
			active: this.workoutPlanDTO.active,
			personal_trainer: this.workoutPlanDTO.personal_trainer
    });
  },
	
	  async update() {
    await UpdateWorkoutPlan.run({
			id: this.workoutPlanDTO.id,
			title: this.workoutPlanDTO.title,
			description: this.workoutPlanDTO.description,
			start_date: this.workoutPlanDTO.start_date,
			end_date: this.workoutPlanDTO.end_date,
			active: this.workoutPlanDTO.active,
			personal_trainer: this.workoutPlanDTO.personal_trainer
    });
  },
	
		  async delete(id) {
    await DeleteWorkoutPlan.run({
			id: id
    });
  }
	
}
