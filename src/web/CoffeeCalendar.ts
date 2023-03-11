import { getCalendarEvents } from "./GoogleCalendar.dao.js";
import "./CoffeeEvent.js";

/**
 * A web component that displays a list of events. It accepts an api key and Calendar ID as attributes.
 */
class CoffeeCalendar extends HTMLElement {
  private calendarElement = document.createElement("div");

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
      ._calendar {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height:100%;
        width:100%;
        background: #f5f5f5;
        font-family: "Helvetica Neue",Arial,sans-serif;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      ._calendar::-webkit-scrollbar {
        width: 5px;
      }

      ._calendar::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }

      ._calendar::-webkit-scrollbar-thumb {
        background: #888; 
      }

      ._calendar::-webkit-scrollbar-thumb:hover {
        background: #555; 
      }
      </style>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.calendarElement.classList.add("_calendar");
    this.shadowRoot?.appendChild(this.calendarElement);
    if (!this.apiKey) {
      throw "Missing API Key";
    }
    if (!this.calendarId) {
      throw "Missing Calendar ID";
    }
    getCalendarEvents(this.apiKey, this.calendarId).then((events) => {
      for (let event of events) {
        const coffeeEvent = document.createElement("coffee-event");
        console.log(event.summary);
        coffeeEvent.setAttribute("title", event.summary);
        coffeeEvent.setAttribute("description", event.description);
        coffeeEvent.setAttribute("start", event.start.dateTime);
        this.calendarElement.appendChild(coffeeEvent);
      }
    });
  }

  get apiKey() {
    return this.getAttribute("apiKey");
  }

  get calendarId() {
    return this.getAttribute("calendarId");
  }
}

// Define the new custom element
customElements.define("coffee-calendar", CoffeeCalendar);
