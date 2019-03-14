import React from 'react';
import { KeyCombo } from '@blueprintjs/core';

export function KeyboardShortcuts() {
  return (
    <div>
      <h2>Main</h2>

      <table style={{width: '100%'}} className="bp3-html-table bp3-html-table-striped">
        <thead>
        <tr>
          <th>Key</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><KeyCombo combo={"shift+j"} /></td>
          <td>Toggle video list modal</td>
        </tr>
        <tr>
          <td><KeyCombo combo={"command+/"} /></td>
          <td>Toggle Keyboard Shortcuts modal</td>
        </tr>
        </tbody>
      </table>
      <br/>
      <h2>Player</h2>

      <table style={{width: '100%'}} className="bp3-html-table bp3-html-table-striped">
        <thead>
        <tr>
          <th>Key</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><KeyCombo combo={"space"} /></td>
          <td>Play / pause</td>
        </tr>
        <tr>
          <td style={{display: 'flex', alignItems: 'center'}}>
            <KeyCombo combo={"left"} /> <span style={{width: 10}}/> or <span style={{width: 10}}/> <KeyCombo combo={"right"} />
          </td>
          <td>Go to (prev / start / next) subtitle</td>
        </tr>
        <tr>
          <td style={{display: 'flex', alignItems: 'center'}}>
            <KeyCombo combo={"0"} /> <span style={{width: 5}}/> or <span style={{width: 5}}/>
            <KeyCombo combo={"1"} /> <span style={{width: 5}}/> ... <span style={{width: 5}}/>
            <KeyCombo combo={"9"} /> <span style={{width: 5}}/>
          </td>
          <td>Go to (prev / start / next) subtitle</td>
        </tr>
        </tbody>
      </table>

    </div>
  );
}
