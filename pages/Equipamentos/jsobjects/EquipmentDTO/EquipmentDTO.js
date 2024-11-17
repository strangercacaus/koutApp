export default {
  equipmentDTO: {
		id: null,
		created_at: null,
		updated_at: null,
    title: null,
		description: null,
		custom:null,
		image_url: null
  },

  loadData(queryResult) {
    this.equipmentDTO.id = queryResult.id;
		this.equipmentDTO.created_at = queryResult.created_at;
		this.equipmentDTO.updated_at = queryResult.updated_at;
		this.equipmentDTO.title = queryResult.title;
		this.equipmentDTO.description = queryResult.description;
		this.equipmentDTO.custom = queryResult.custom;
	  this.equipmentDTO.image_url = queryResult.image_url;
  },

  saveDataFromUI(id, created_at, updated_at, title, description, custom, image_url) {
    this.equipmentDTO.id = id;
		this.equipmentDTO.created_at = created_at;
		this.equipmentDTO.updated_at = updated_at;
		this.equipmentDTO.title = title;
		this.equipmentDTO.description = description;
		this.equipmentDTO.custom = custom;
		this.equipmentDTO.image_url = image_url;
	},
	
  clearData() {
    this.equipmentDTO.id = null;
		this.equipmentDTO.created_at = null;
		this.equipmentDTO.updated_at = null;
		this.equipmentDTO.title = null;
		this.equipmentDTO.description = null;
		this.equipmentDTO.custom = null;
		this.equipmentDTO.image_url = null;

  },

  async save() {
    await CreateEquipment.run({
			title: this.equipmentDTO.title,
			description: this.equipmentDTO.description,
			custom: this.equipmentDTO.custom,
		  image_url: this.equipmentDTO.image_url
    });
  },
	
	  async update() {
    await UpdateEquipment.run({
			id: this.equipmentDTO.id,
			title: this.equipmentDTO.title,
			description: this.equipmentDTO.description,
			custom: this.equipmentDTO.custom,
			image_url: this.equipmentDTO.image_url
    });
  },
	
		async delete(id) {
    await DeleteEquipment.run({
			id: id
    });
  }
	
}