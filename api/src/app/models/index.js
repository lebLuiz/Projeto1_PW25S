const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Esse campo precisa ser um e-mail',
      },
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  role: {
    type: DataTypes.ENUM,
    values: ['ADMIN', 'TEC', 'DEFAULT'],
    defaultValue: 'DEFAULT',
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
      isUppercase: {
        msg: 'Esse campo precisa receber letras MAIUSCULAS',
      },
      isIn: [['ADMIN', 'TEC', 'DEFAULT']],
    },
  },
  id_user_relation: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'users',
});
User.hasMany(User, { foreignKey: 'id_user_relation', as: 'RelationUsers' });

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
}, {
  tableName: 'categories',
});

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
      len: {
        args: [4, 45],
        msg: 'Esse campo deve ter entre 4 e 45 caracteres',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
      len: {
        args: [10, 155],
        msg: 'Esse campo deve ter entre 10 e 155 caracteres',
      },
    },
  },
  status: {
    type: DataTypes.ENUM,
    values: [
      'ABERTO',
      'PENDENTE',
      'EM_ESPERA',
      'RESOLVIDO',
      'FECHADO',
    ],
    defaultValue: 'ABERTO',
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
      isUppercase: {
        msg: 'Esse campo precisa receber letras MAIUSCULAS',
      },
      isIn: [[
        'ABERTO',
        'PENDENTE',
        'EM_ESPERA',
        'RESOLVIDO',
        'FECHADO',
      ]],
    },
  },
  technical_comment: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 155],
        msg: 'Esse campo deve ter no máximo 155 caracteres',
      },
    },
  },

  id_category: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onDelete: 'SET NULL',
    references: {
      model: 'Category',
      key: 'id',
    },
  },

  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  id_user_tec: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'tickets',
});
Ticket.belongsTo(Category, {
  as: 'category',
  foreignKey: 'id_category',
});

const db = {
  User,
  Category,
  Ticket,
  sequelize,
};

module.exports = db;
