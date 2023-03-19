import {StyleSheetManager} from 'styled-components'
import React from "react";
import {createRoot} from "react-dom/client";
import {CoffeeCalendar} from "./coffee-calendar";

function createReactComponent(subject: JSX.Element) {
  return class extends HTMLElement {
    private readonly shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
      const root = createRoot(this.shadow);
      root.render(
        <StyleSheetManager target={this.shadow}>
          {subject}
        </StyleSheetManager>
      )
    }
  }
}

customElements.define('coffee-calendar', createReactComponent(CoffeeCalendar(500)));