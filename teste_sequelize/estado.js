

module.exports =  function(sequelize, dataType){
	return sequelize.define('CORRESP_estado',
		{
			id_estado: {
				type: dataType.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			st_estado:{
				type: dataType.STRING
			}	
		},
		{
			timestamps: false,
			freezeTableName: true,
			raw: true
		}
	);
}