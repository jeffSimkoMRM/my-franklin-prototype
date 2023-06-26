// Importing the `fetchData` function from a module
import { fetchData } from '../../scripts/lib-franklin.js';

// A string that represents an HTML table template with placeholders for user data
const templateString = `
  <table>
    <thead>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>IP address</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {{~it.data :user:index}}
        <tr>
          <td>{{=user.first_name}}</td>
          <td>{{=user.last_name}}</td>
          <td>{{=user.email}}</td>
          <td>{{=user.gender}}</td>
          <td>{{=user.ip_address}}</td>
          <td>{{=user.latitude}}</td>
          <td>{{=user.longitude}}</td>
        </tr>
      {{~}}
    </tbody>
  </table>
`;

// A function that takes a block element and user data as arguments,
// generates an HTML table using the given template, and appends it to the block.
function renderTable(block, userData) {
    const tableHTML = doT.template(templateString)(userData); // Generate the HTML table
    block.insertAdjacentHTML('beforeend', tableHTML); // Append the HTML table to the block
}

// An async function that decorates a given DOM block by replacing its contents 
// with a paginated HTML table that contains user data fetched from a JSON file
export default async function decorate(block) {
    const jsonLink = block.querySelector('a[href$=".json"]'); // Find link to JSON data in the block
    const defaultChild = block.firstElementChild; // Get the initial contents of the block
    block.removeChild(defaultChild); // Remove the initial contents from the block

    if (jsonLink) { // If a link to JSON data was found
        const dataURL = jsonLink.href; // Extract the URL from the link element

        try {
            const userData = await fetchData(`${dataURL}?limit=20`); // Fetch user data from the URL
            renderTable(block, userData); // Generate and append an HTML table with the user data
        } catch (error) {
            console.error('Error fetching user data:', error); // Handle errors gracefully
        }
    } else {
        console.warn('No link to JSON found in block:', block); // Warn if no link to JSON was found
    }
}