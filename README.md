# deTronEvent

- TRON: A Decentralized Self Event Management Eco-System

## System Guideline

1. Frontend [Frontend] (front/README.md)
2. Backend [Backend] (back/README.md)
3. Contract [Contract] (contract/README.md)

## Submission

### A. Project Description

- Name: deTronEvent
- Description: A decentralized self Event Management Eco-System for Organizers, Stakeholders, Sponsors, and Influencers on TRON Network

#### What's next (Milestones)

- Q3-2022: Ticket and Event Management for Eco-System (Done)
- Q4-2022: Ticket Staking, Mobile App, Integrate BTTC Network (WIP)
- Q1-2023: Complete Roles of Stakeholders, Sponsors, and Influencers
- Q2-2023: Support Multiple Chain, Governance Token

#### Members

```sh
1. Team Leader (Blockchain Developer): https://devpost.com/solokop (Hiep Le)
2. Business Analyst: https://devpost.com/f2haiphong (Hien Nguyen)
3. Frontend Developer:
- https://devpost.com/nguyennghidt6 (Nghi Nguyen)
- Huy Le
- Tu Nguyen
4. Backend Developer: Duy Nguyen, Dat Nguyen
5. Blockchain Developer: Hiep Le, Son Lam
```

### B-1. 5 minute Pitch Video

- Project Name: deTronEvent
- Presentation-1: https://www.youtube.com/watch?v=ORAGAb4dYVk

### B-2. Design UX/UI

- Figma Link: https://www.figma.com/file/JfucGydq4HBgGY1vYqzMQo/NTS-v3_deTronEvent

### C. GitHub Repo Link

- Link: https://github.com/laboon-org/deTronEvent

### D. List of Tech Stack Used

- ReactJS
- QR-Code Scanner
- IPFS
- Solidity
- TailwindCSS
- Web3
- TronLink and more

### E-1. Project Demo Link

- Demo: https://dte.law3.app/
- Credential: admin / 9rR9fT29tvPZ

### E-2. Verification Steps

#### Roles and Users

- Event Owner: The person who self-controls events by themselves

- Consumer: The person who uses and purchases tickets for the desired event, well-known as the end user.

- Ticket Conductor: The person assigned the right to manage and conduct. On behalf of the event owners.

#### Features

##### 1. Event Creating

- User: Event Owners

> 1. Select the Event item on the navigation bar in the footer.
> 2. Click the Add Event button
> 3. Enter the required event information and confirm Event creation.
> 4. Wait for the results to return.
> 5. In success, the created Event will appear on the Events page.

##### 2. Ticket Creating

- User: Event Owners

> 1. Select the Ticket item on the navigation bar in the footer.
> 2. Follow the steps to create tickets and confirm ticket creation.
> 3. Wait for the authentication to mint the Ticket and sign the transaction.
> 4. Wait for the results to return.
> 5. In success, the generated tickets will appear in the Tickets tab in the related event detailed info.

##### 3. Ticket Selling

- User: Event Owner, Ticket Conductor

> 1. Select the Event item on the navigation bar in the footer.
> 2. Select not yet unsold Tickets and Events.
> 3. Switch to the Ticket tab in the Event details.
> 4. Click the Sell button.
> 5. Enter the number of tickets you want to sell and the price.
> 6. Wait for ticketing validation and transaction signing.
> 7. Wait for the results to return.
> 8. In success, the tickets selected for sale will show the price with the status "Selling".

##### 4. Ticket Purchasing

- User: Consumer

> 1. Select the Event you want to buy Tickets from on the Home page.
> 2. Select the Tickets that are on sale and want to buy.
> 3. Click the "Buy Ticket" button.
> 4. Ticket purchase confirmation.
> 5. Wait for the confirmation of the Ticket purchase and sign the transaction.
> 6. Wait for the results to return.
> 7. In success, the Ticket Owner's information will change to that of the buyer.

##### 5. Ticket Conducting

- User: Ticket Conductor

> 1. Select the camera frame icon on the header
> 2. Granting permission to use the camera
> 3. Select the camera you want to use and click the Start Scanning button (if there is only one > 2. camera, skip this step)
> 4. Scan the QR code of the Ticket you want to check.
> 5. Wait for ticket validation.
> 6. If the Ticket is valid and a transaction appears, sign the transaction to complete.
> 7. In success, the usage information of the checked Ticket will change to "Used".

### F. Forum

- Season 2: https://forum.trondao.org/t/detronevent-event-management-eco-system/4392

- Season 3: https://forum.trondao.org/t/detronevent-event-ticket-eco-system-season-3/13153

### G. Obstacles Thing

1. High GAS Cost per transaction for minting NFT, and the Contract execution.
2. Unrollable on failure transaction on the chain.
3. Low Latency network on responding speed.
4. Handling ASYNC processing is quite a complex.
5. Contract deployment was facing trouble because of too much logic inside.