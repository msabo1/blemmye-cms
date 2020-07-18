import { applyDecorators, UseGuards } from "@nestjs/common";
import { Privilege } from "./privilege.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { PrivilegeGuard } from "../guards/privilege.guard";

export function PrivilegeAuth(permission, group){
    return applyDecorators(
        Privilege(permission, group),
        UseGuards(JwtAuthGuard, PrivilegeGuard)
    );
}