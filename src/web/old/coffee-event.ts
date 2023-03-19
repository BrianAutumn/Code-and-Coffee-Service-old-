import {MeetupEvent} from "../../lambda/dao/meetup.dao";

/**
 *  A web component that displays an event. It accepts the title of the event as an attribute
 */
class CoffeeEvent extends HTMLElement {
  static get observedAttributes() {
    return ["event"];
  }

  private readonly titleElement;
  private readonly startElement;
  private readonly attendeeElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
      ._event-holder {
        display: flex;
        flex-direction: row;
        background: #ffe6ca;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12) !important;
        transition: box-shadow 280ms cubic-bezier(.4,0,.2,1), background 280ms cubic-bezier(.4,0,.2,1);
      }
      
      ._event-holder:hover {
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)!important;
      }
      
      ._event-main {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      
      ._event-title {
        margin: 0;
      }
      
      ._event-start {
        margin: 0;
      }
      
      ._event-meetup-logo {
        height: 50px;
      }
      
      ._event-logo-holder {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
      
      ._event-logo-halo {
        border-radius: 50%;
        transition: background 280ms cubic-bezier(.4,0,.2,1);
        cursor: pointer;
      }
      
      ._event-logo-halo:hover {
        background: #ffc48d;
      }
      
      ._event-spacer {
        flex-grow: 1;
      }
      
      </style>
      <div class="_event-holder">
        <div class="_event-main">
          <h3 class="_event-title"></h3>
          <p class="_event-start"></p>
          <p class="_event-attendee"></p>
        </div>
        <div class="_event-spacer"></div>
        <div class="_event-logo-holder">
          <div class="_event-logo-halo">
            <img src="https://d3ldp4mijqfzeg.cloudfront.net/Meetup_Logo.png" class="_event-meetup-logo" alt="Meetup Logo">
          </div>
        </div>
      </div>
    `;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.titleElement = this.shadowRoot?.querySelector(
      "._event-title"
    ) as HTMLHeadingElement;
    this.startElement = this.shadowRoot?.querySelector(
      "._event-start"
    ) as HTMLParagraphElement;
    this.attendeeElement = this.shadowRoot?.querySelector(
      "._event-attendee"
    ) as HTMLParagraphElement;
    this.updateEvent();
  }

  updateEvent(): void {
    const event = JSON.parse(this.getAttribute("event") || "{}") as MeetupEvent;

    this.titleElement.innerText = event.title

    const date = new Date(event.dateTime);
    const day = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    if (this.startElement) {
      this.startElement.innerText = `${day} at ${time}`;
    }
    this.attendeeElement.innerText = `${event.going} attendees`
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.updateEvent();
  }
}

customElements.define("coffee-event", CoffeeEvent);
