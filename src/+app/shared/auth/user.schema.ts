export class User {
  private _username: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  constructor(json: any) {
    this.username = json.username;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
  }
  get username(): string {
    return this._username;
  }
  set username(username: string) {
    this._username = username;
  }
  get firstName(): string {
    return this._firstName;
  }
  set firstName(firstName: string) {
    this._firstName = firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  set lastName(lastName: string) {
    this._lastName = lastName;
  }
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }
}
