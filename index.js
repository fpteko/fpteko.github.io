const username = "fpteko";

async function fetchProjects() {
  const projectsContainer = document.getElementById("projects");
  
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    const repos = await response.json();
    
    // Clear the container
    projectsContainer.innerHTML = "";
    
    // Loop through each repo and create a project card
    repos.forEach(repo => {
      // Create a new div for each project
      const projectDiv = document.createElement("div");
      projectDiv.className = "project";
      
      // Get the description or use a default message
      const description = repo.description || "No description available";
      
      // Create the HTML content for the project
      projectDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${description}</p>
        <a href="${repo.html_url}" target="_blank">View Project</a>
      `;
      
      // Add the project to the container
      projectsContainer.appendChild(projectDiv);
    });

  } catch (error) {
    projectsContainer.innerHTML = "<p>Unable to load projects.</p>";
    console.error(error);
  }
}

// Call the function when the page loads
fetchProjects();
