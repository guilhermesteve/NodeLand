import { Schema, model, connection } from 'mongoose'

type UserType = {
    email: string,
    age: number,
    interests: [string],
    name: {
        firstName: string,
        lastName: string
    }
}

const schema = new Schema<UserType>({
    email: { type: String, required: true },
    age: { type: Number, required: true },
    interests: [String],
    name: {
        firstName: { type: String, required: true },
        lastName: String
    }
})

const modelName: string = 'Users'

const models = () => {
    if (connection && connection.models[modelName]) {
        return connection.models[modelName]
    }

    return model<UserType>(modelName, schema)
}

export default models()