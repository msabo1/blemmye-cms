import { SetMetadata } from "@nestjs/common";
import { Privilege as PrivilegeModel } from "../../roles/models/privilege.model";

export function Privilege(permission: string, group: string){
    const privilege: PrivilegeModel = {
        group: {name: group}, 
        permission: {name: permission}
    };
    return SetMetadata('privilege', privilege);
}