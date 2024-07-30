import { Roles } from "./roles";

export class Utilisateur {
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Set<Roles>;
  
    constructor(idUser?: number, firstName?: string, lastName?: string, email?: string, password?: string, roles?: Set<Roles>) {
      this.idUser = idUser || 0;
      this.firstName = firstName || '';
      this.lastName = lastName || '';
      this.email = email || '';
      this.password = password || '';
      this.roles = roles || new Set<Roles>();
    }
  
    public getIdUser(): number {
      return this.idUser;
    }
  
    public setIdUser(idUser: number): void {
      this.idUser = idUser;
    }
  
    public getFirstName(): string {
      return this.firstName;
    }
  
    public setFirstName(firstName: string): void {
      this.firstName = firstName;
    }
  
    public getLastName(): string {
      return this.lastName;
    }
  
    public setLastName(lastName: string): void {
      this.lastName = lastName;
    }
  
    public getEmail(): string {
      return this.email;
    }
  
    public setEmail(email: string): void {
      this.email = email;
    }
  
    public getPassword(): string {
      return this.password;
    }
  
    public setPassword(password: string): void {
      this.password = password;
    }
  
    public getRoles(): Set<Roles> {
      return this.roles;
    }
  
    public setRoles(roles: Set<Roles>): void {
      this.roles = roles;
    }
  
    public toString(): string {
      return `User [id=${this.idUser}, firstName=${this.firstName}, lastName=${this.lastName}, email=${this.email}, password=${this.password}]`;
    }
  }
  