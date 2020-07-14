import { Entity, OneToOne, RelationId, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Role } from "../roles/entities/role.entity";

@Entity()
export class Preferences{

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @OneToOne(type => Role)
    @JoinColumn()
    defaultRole: Role;

    @RelationId((preferences: Preferences) => preferences.defaultRole)
    defaultRoleId: string;

    @JoinColumn()
    @OneToOne(type => Role)
    visitorRole: Role;

    @RelationId((preferences: Preferences) => preferences.visitorRole)
    visitorRoleId: string;
}