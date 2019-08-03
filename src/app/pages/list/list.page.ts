import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models";
import { NoteService } from "src/app/api/note.service";

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  private icons = [
    "flask",
    "wifi",
    "beer",
    "football",
    "basketball",
    "paper-plane",
    "american-football",
    "boat",
    "bluetooth",
    "build"
  ];

  public notes: Note[] = [];
  constructor(public noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getAll().subscribe(res => {
      console.log("GOT RES", res);
      this.notes = res.data;
    });
  }
}
