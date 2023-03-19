import {createRoot} from "react-dom/client";
import {StyleSheetManager} from "styled-components";
import React from "react";

export function createReactWebComponent(subject: JSX.Element) {
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