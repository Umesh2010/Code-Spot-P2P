import { Injectable } from '@angular/core';
import { NameService } from './name.service';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  private cursorDecorations: Decoration[] = [];
  private selectionDecorations: Decoration[] = [];
  // Color: 1 to 100
  private peerColors: Map<string, number> = new Map<string, number>();
  private myColor: number;
  private myLastCursorEvent: any = null;
  private myLastSelectEvent: any = null;

  constructor(private nameService: NameService) {}

  drawCursor(editor: any, line: number, col: number, ofPeerId: string) {
    const peerName = this.nameService.getPeerName(ofPeerId);
    const color = this.peerColors.get(ofPeerId);
    const deco = this.cursorDecorations.filter((d) => d.peerId === ofPeerId);
    const oldDecoration = deco.map((d) => d.decoration);
    const decoration = editor.deltaDecorations(
      oldDecoration, // Remove old deco
      [
        {
          range: new monaco.Range(line, col, line, col + 1),
          options: { className: 'monaco-cursor-' + color, stickiness: 1, hoverMessage: {value: peerName}},
        },
      ]
    );
    this.cursorDecorations = this.cursorDecorations.filter(
      (d) => d.peerId !== ofPeerId
    );
    this.cursorDecorations.push(new Decoration(decoration, ofPeerId));
  }

  drawSelection(
    editor: any,
    startLine: number,
    startCol: number,
    endLine: number,
    endCol: number,
    ofPeerId: string
  ) {
    const peerName = this.nameService.getPeerName(ofPeerId);
    const color = this.peerColors.get(ofPeerId);
    const deco = this.selectionDecorations.filter((d) => d.peerId === ofPeerId);
    const oldDecoration = deco.map((d) => d.decoration);
    const decoration = editor.deltaDecorations(oldDecoration, [
      {
        range: new monaco.Range(startLine, startCol, endLine, endCol),
        options: { className: 'monaco-select-' + color, stickiness: 3, hoverMessage: {value: peerName}},
      },
    ]);
    this.selectionDecorations = this.selectionDecorations.filter(
      (d) => d.peerId !== ofPeerId
    );
    this.cursorDecorations.push(new Decoration(decoration, ofPeerId));
  }

  setPeerColor(peerId: string, color: number): void {
    this.peerColors.set(peerId, color);
  }

  removePeer(editor: any, peerId: string): void {
    this.peerColors.delete(peerId);
    const cursorDecoration = this.cursorDecorations.filter((d) => d.peerId === peerId).map((d) => d.decoration);
    const selectDecoration = this.cursorDecorations.filter((d) => d.peerId === peerId).map((d) => d.decoration);
    editor.deltaDecorations(cursorDecoration, []);
    editor.deltaDecorations(selectDecoration, []);
  }

  getPeerColors(): Map<string, number> {
    return this.peerColors;
  }

  getMyCursorColor(): number {
    return this.myColor;
  }

  setMyCursorColor(color: number): void {
    this.myColor = color;
  }

  getMyLastCursorEvent(): any {
    return this.myLastCursorEvent;
  }

  setMyLastCursorEvent(event: any): void {
    this.myLastCursorEvent = event;
  }

  getMyLastSelectEvent(): any {
    return this.myLastSelectEvent;
  }

  setMyLastSelectEvent(event: any): void {
    this.myLastSelectEvent = event;
  }

}


class Decoration {
  decoration: any;
  peerId: string;
  constructor(decoration: any, peerId: string) {
    this.decoration = decoration;
    this.peerId = peerId;
  }
}
