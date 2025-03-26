// app/javascript/controllers/portfolio_controller.js

import { Controller } from "@hotwired/stimulus"


const interest = [
    { name: "React", description: "I develop modern and dynamic web applications using React, leveraging its component-based architecture and efficient DOM updates with React Hooks and Context API." },
    { name: "React Native", description: "I develop cross-platform mobile applications with React Native, integrating Node.js to create efficient and scalable APIs." },
    { name: "Next.js", description: "I work with Next.js to build optimized web applications, implementing SSR (Server-Side Rendering), SSG (Static Site Generation), and API Routes to enhance performance and SEO." },
    { name: "PostgreSQL", description: "I use PostgreSQL as a relational database to efficiently manage data, ensuring integrity and scalability in my web applications." },
    { name: "TypeScript", description: "I prefer TypeScript to write safer and more maintainable code, leveraging static typing to reduce errors and improve project scalability." },
    { name: "Tailwind CSS", description: "I use Tailwind CSS to design modern and responsive interfaces efficiently, maximizing style reusability and optimizing CSS performance." }
];

const interesContainer = document.getElementById('interesContainer');


export default class extends Controller {
    connect() {
        interest.forEach(item => {
            const interestDiv = document.createElement('div');
            interestDiv.classList.add('interest-item');
            
            const interestName = document.createElement('h2');
            interestName.textContent = item.name;
            
            const interestDescription = document.createElement('p');
            interestDescription.textContent = item.description;
            
            interestDiv.appendChild(interestName);
            interestDiv.appendChild(interestDescription);
            
            interesContainer.appendChild(interestDiv);
        });
        
        async function getData(category = 'technology') {
            if (category === 'all') {
                category = 'latest';
            }
            
            const API_URL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=69f1db816e144fd1bb6dc636794cbdc9`;
            const dataContainer = document.getElementById('dataContainer');
            dataContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'align-items-center', 'gap-4', 'w-75', 'mx-auto');
        
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log(data);
        
                let content = '';
                data.articles.slice(0, 10).forEach(article => {
                    content += `
                        <div class="card" style="width: 22rem; margin: 10px;">
                            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="Imagen de noticia">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description || 'Sin descripción disponible.'}</p>
                                <a href="${article.url}" class="btn btn-primary" target="_blank">Leer más</a>
                            </div>
                        </div>
                    `;
                });
        
                dataContainer.innerHTML = content;
            } catch (error) {
                dataContainer.innerHTML = `<p class="text-danger">Error al cargar noticias: ${error.message}</p>`;
                console.error('Error al obtener datos:', error);
            }
        }
        }
    }

