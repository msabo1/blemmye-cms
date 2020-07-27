import { Entity, OneToOne, RelationId, PrimaryGeneratedColumn, JoinColumn, Column } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { PreferencesExtension } from "../../plugins/entity-extensions/preferences-extension.entity";

@Entity()
export class Preferences{

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @OneToOne(type => Role)
    @JoinColumn({name: 'defaultRoleId'})
    defaultRole: Role;

    @Column()
    defaultRoleId: string;
    
    @OneToOne(type => Role)
    @JoinColumn({name: 'visitorRoleId'})
    visitorRole: Role;

    @Column()
    visitorRoleId: string;

    @Column(type => PreferencesExtension)
    extension: PreferencesExtension;
}