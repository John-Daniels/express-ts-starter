
export const isDuplicate = async (props: object, model: any) => await model.findOne(props) ? true : false

export { default as userValidater } from './user.validator'