export interface Position {
  left: number; //the X position of the component
  top: number; //the Y position of the component
  width: number; //the width of the component
  height: number; //the height of the component
}

export class Note {
  public content = "";
  public ts = 0;
  public position: Position = { left: 50, top: 50, width: 200, height: 200 };
  public title = "";
  public editMode = false;
  public style = { backgroundColor: "#FCC53A", fontSize: "14px", color: "#000000" };
  constructor() {
    this.ts = new Date().getTime();
  }
}
