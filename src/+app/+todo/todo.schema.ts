export class Todo {
  constructor(
    public id: number,
    public created_at: Date,
    public value: string,
    public completed: boolean,
  ) { }
}
