import { Utilisateur } from "./utilisateur";


export enum ERole {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  // Add other roles as needed
}

export class Roles {
  id: number;
  name: ERole;
  users: Utilisateur[];

  constructor(id?: number, name?: ERole, users?: Utilisateur[]) {
    this.id = id || 0;
    this.name = name || ERole.USER;
    this.users = users || [];
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): ERole {
    return this.name;
  }

  public setName(name: ERole): void {
    this.name = name;
  }

  public getUsers(): Utilisateur[] {
    return this.users;
  }

  public setUsers(users: Utilisateur[]): void {
    this.users = users;
  }
}

