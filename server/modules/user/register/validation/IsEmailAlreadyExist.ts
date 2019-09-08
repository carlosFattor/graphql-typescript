import { ValidatorConstraintInterface, ValidatorConstraint, ValidationOptions, registerDecorator } from "class-validator";
import { UserModel } from "../../../../models/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(email: string): Promise<boolean> {
        const user = await UserModel.findOne({ email });
        return !user;
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    };
}