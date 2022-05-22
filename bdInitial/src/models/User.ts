import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/mysql'

interface UserInterface extends Model {
    id: number,
    name: string,
    age: number
}

export const User = sequelize.define<UserInterface>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        get() {
            const raw = this.getDataValue('name')
            return raw.toUpperCase()
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 18
    }
}, {
    tableName: 'users',
    timestamps: false
})