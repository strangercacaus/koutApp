export default {
  exerciseDTO: {
		id: null,
		created_at: null,
		updated_at: null,
    title: null,
		title_en: null,
		equipment: null,
		muscle_group_id:null,
		type: null,
		image_url: null,
		custom: null
  },

  loadData(queryResult) {
    this.exerciseDTO.id = queryResult.id;
		this.exerciseDTO.created_at = queryResult.created_at;
		this.exerciseDTO.updated_at = queryResult.updated_at;
		this.exerciseDTO.title = queryResult.title;
		this.exerciseDTO.title_en = queryResult.title_en;
		this.exerciseDTO.equipment = queryResult.equipment;
		this.exerciseDTO.muscle_group_id = queryResult.muscle_group_id;
		this.exerciseDTO.type = queryResult.type;
		this.exerciseDTO.image_url = queryResult.image_url;
		this.exerciseDTO.custom = queryResult.custom;
  },

  saveDataFromUI(id, title, title_en, created_at, updated_at, equipment, muscle_group_id, type, image_url, custom) {
    this.exerciseDTO.id = id;
		this.exerciseDTO.created_at = created_at;
		this.exerciseDTO.updated_at = updated_at;
		this.exerciseDTO.title = title;
		this.exerciseDTO.title_en = title_en;
		this.exerciseDTO.equipment = equipment;
		this.exerciseDTO.muscle_group_id = muscle_group_id;
		this.exerciseDTO.type = type;
		this.exerciseDTO.image_url = image_url;
		this.exerciseDTO.custom = custom;
  },

  clearData() {
    this.exerciseDTO.id = null;
		this.exerciseDTO.created_at = null;
		this.exerciseDTO.updated_at = null;
		this.exerciseDTO.title = null;
		this.exerciseDTO.title_en = null;
		this.exerciseDTO.equipment = null;
		this.exerciseDTO.muscle_group_id = null;
		this.exerciseDTO.type = null;
		this.exerciseDTO.image_url = null;
		this.exerciseDTO.custom = null;
  }
	
}
