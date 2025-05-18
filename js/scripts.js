document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: "ease-out",
    once: true
  });

  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Typed.js Initialization
  let typedInstance = null;
  function initTyped() {
    const typedElement = document.getElementById("typed-text");
    if (typedElement) {
      if (typedInstance) {
        typedInstance.destroy();
      }
      typedInstance = new Typed("#typed-text", {
        strings: ["a Cloud Engineer", "an AWS Specialist", "a Python Developer", "a DevOps Engineer"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
      });
    }
  }
  initTyped();

  // Particles.js Initialization
  function initParticles(theme) {
    const particleColor = theme === "dark" ? "#ffffff" : "#cccccc";
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: particleColor },
        shape: { type: "circle", stroke: { width: 0 } },
        opacity: { value: 0.5, random: true, anim: { enable: false } },
        size: { value: 3, random: true, anim: { enable: false } },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.7 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
  initParticles(currentTheme);

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    const newTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    if (newTheme === "dark") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
    initTyped();
    initParticles(newTheme);
    setTimeout(() => AOS.refresh(), 100);
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    initTyped();
    AOS.refresh();
  });

  // Scroll to Top
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Project Data
  const projectsData = {
    "web-hosting": {
      title: "Web Hosting and Deployment on AWS",
      subtitle: "Scalable Web Solutions",
      image: "images/project1.jpg",
      description: "Designed and deployed highly available web applications using AWS services, including static and dynamic hosting solutions.",
      features: [
        "Hosted static website using AWS S3, Route 53, and CloudFront",
        "Deployed WordPress on EC2, RDS, Route 53, VPC, and LightSail",
        "Configured Apache/Nginx on EC2 for web services",
        "Built 3-tier web app with Application Load Balancer, EC2, and RDS"
      ],
      technologies: ["AWS S3", "EC2", "RDS", "Route 53", "CloudFront", "LightSail", "VPC", "ALB"],
      links: { demo: "#", code: "#" }
    },
    "iac-automation": {
      title: "Infrastructure as Code and Automation",
      subtitle: "Automated Infrastructure",
      image: "images/project2.jpg",
      description: "Streamlined AWS resource provisioning and management using Terraform, CloudFormation, and serverless automation.",
      features: [
        "Deployed VPC, EC2, and RDS using Terraform and CloudFormation",
        "Automated EC2 patching with AWS Systems Manager",
        "Used EventBridge and Lambda for automated infrastructure deployment"
      ],
      technologies: ["Terraform", "CloudFormation", "AWS Lambda", "EventBridge", "Systems Manager"],
      links: { demo: "#", code: "#" }
    },
    "cicd-devops": {
      title: "CI/CD and DevOps",
      subtitle: "Automated Deployment",
      image: "images/project3.jpg",
      description: "Developed CI/CD pipelines and deployed containerized applications using AWS DevOps tools and container services.",
      features: [
        "Built CI/CD pipeline for Node.js app with CodePipeline, CodeBuild, CodeDeploy",
        "Automated WordPress deployment with Terraform and Ansible",
        "Deployed Dockerized app on ECS with Fargate and ECR"
      ],
      technologies: ["AWS CodePipeline", "CodeBuild", "CodeDeploy", "ECS", "Fargate", "ECR", "Terraform", "Ansible"],
      links: { demo: "#", code: "#" }
    }
  };

  // Initialize Bootstrap Modal for Projects
  const projectModal = new bootstrap.Modal(document.getElementById("projectModal"));
  document.querySelectorAll(".view-details").forEach(button => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      const project = projectsData[projectId];

      if (project) {
        document.getElementById("projectModalTitle").textContent = project.title;
        document.getElementById("projectModalSubtitle").textContent = project.subtitle;
        document.getElementById("projectModalImage").src = project.image;
        document.getElementById("projectModalImage").alt = project.title;
        document.getElementById("projectModalDescription").textContent = project.description;

        const featuresList = document.getElementById("projectModalFeatures");
        featuresList.innerHTML = "";
        project.features.forEach(feature => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = feature;
          featuresList.appendChild(li);
        });

        const techContainer = document.getElementById("projectModalTechnologies");
        techContainer.innerHTML = "";
        project.technologies.forEach(tech => {
          const badge = document.createElement("span");
          badge.className = "badge bg-primary me-1";
          badge.textContent = tech;
          techContainer.appendChild(badge);
        });

        document.getElementById("projectModalDemoBtn").href = project.links.demo;
        document.getElementById("projectModalCodeBtn").href = project.links.code;

        projectModal.show();
      }
    });
  });

  // Experience Data
  const experienceData = {
    "cloud-engineer": {
      title: "Cloud Engineer",
      subtitle: "Standard Telephones and Cables",
      company: "Standard Telephones and Cables (AWS Advanced-tier Partner Services) - Remote",
      date: "Jul 2023 – Present | Harare, Zimbabwe",
      responsibilities: [
        "Designed and implemented scalable, efficient cloud solutions using AWS technologies, ensuring high availability and cost-effectiveness.",
        "Collaborated with over 40 clients to assess their business and cloud infrastructure needs, applying AWS best practices for operational efficiency.",
        "Engaged daily with customers to understand migration needs, documented AWS architectures, and contributed to over 15 AWS migration projects.",
        "Provided administrative support, proactive monitoring, and resource provisioning for AWS clients, achieving nearly 99.9% uptime.",
        "Developed an in-house AWS-based solution for storing CCTV footage, reducing client storage costs by 30% and now offered as a product.",
        "Implemented cost optimization strategies, including rightsizing instances, autoscaling, and AWS Savings Plans, reducing client costs by 15-40%."
      ]
    },
    "hpe-engineer": {
      title: "HPE Technical Support Engineer",
      subtitle: "First Pack Services",
      company: "First Pack Services",
      date: "Nov 2020 – Jun 2023 | Harare, Zimbabwe",
      responsibilities: [
        "Supplied and configured top-of-the-line HPE servers, handling racking and setup for optimal performance.",
        "Resolved over 150 technical queries in a timely, customer-focused manner.",
        "Provided administrative support and troubleshooting for infrastructure systems and servers, collaborating with HPE.",
        "Set up and configured client networks, including firewall configurations and structured cabling installation."
      ]
    },
    "intern": {
      title: "Control and Instrumentation Intern",
      subtitle: "Anglo-American Unki Mine",
      company: "Anglo-American Unki Mine",
      date: "Dec 2018 – Aug 2019 | Shurugwi, Zimbabwe",
      responsibilities: [
        "Calibrated processing plant control instruments and equipment.",
        "Monitored industrial equipment using a SCADA system, identifying faulty instruments and scheduling maintenance.",
        "Assisted in maintaining underground mine communications and remote blasting systems."
      ]
    }
  };

  // Initialize Bootstrap Modal for Experience
  const experienceModal = new bootstrap.Modal(document.getElementById("experienceModal"));
  document.querySelectorAll(".experience-details-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const experienceId = this.getAttribute("data-experience");
      const experience = experienceData[experienceId];

      if (experience) {
        document.getElementById("experienceModalTitle").textContent = experience.title;
        document.getElementById("experienceModalSubtitle").textContent = experience.subtitle;
        document.getElementById("experienceModalCompany").textContent = experience.company;
        document.getElementById("experienceModalDate").textContent = experience.date;

        const responsibilitiesList = document.getElementById("experienceModalResponsibilities");
        responsibilitiesList.innerHTML = "";
        experience.responsibilities.forEach(resp => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = resp;
          responsibilitiesList.appendChild(li);
        });

        experienceModal.show();
      }
    });
  });

  // Blog Data
  const blogPosts = {
    "aws-serverless": {
      title: "Building Serverless Apps with AWS",
      date: "May 10, 2025",
      category: "Cloud Computing",
      image: "images/blog1.jpg",
      content: `
        <p>Serverless computing is revolutionizing how we build scalable applications. In this post, I walk through creating a serverless app using AWS Lambda and API Gateway.</p>
        <h4 class="mt-4">Key Steps</h4>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">Set up Lambda functions with Python</li>
          <li class="list-group-item">Configure API Gateway for RESTful endpoints</li>
          <li class="list-group-item">Integrate with DynamoDB for data storage</li>
          <li class="list-group-item">Optimize costs with serverless scaling</li>
        </ul>
        <div class="alert alert-info">
          <i class="fas fa-lightbulb me-2"></i>
          Want to try serverless? Start with AWS Free Tier!
        </div>
      `
    },
    "cicd-devops": {
      title: "Streamlining DevOps with CI/CD",
      date: "May 14, 2025",
      category: "DevOps",
      image: "images/blog2.jpg",
      content: `
        <p>Continuous Integration and Continuous Deployment (CI/CD) are critical for modern DevOps. This post covers setting up a CI/CD pipeline with Jenkins and Kubernetes.</p>
        <h4 class="mt-4">Pipeline Setup</h4>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>Stage</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Build</td>
                <td>Jenkins</td>
              </tr>
              <tr>
                <td>Test</td>
                <td>Jest</td>
              </tr>
              <tr>
                <td>Deploy</td>
                <td>Kubernetes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <h5>Next Steps</h5>
            <ol>
              <li>Add automated testing</li>
              <li>Integrate with GitHub Actions</li>
              <li>Monitor pipeline performance</li>
            </ol>
          </div>
        </div>
      `
    },
    "cloud-security": {
      title: "Securing AWS Infrastructure",
      date: "May 16, 2025",
      category: "Cloud Security",
      image: "images/blog3.jpg",
      content: `
        <p>Security is paramount in cloud environments. This post explores best practices for securing AWS infrastructure using IAM and VPCs.</p>
        <h4 class="mt-4">Best Practices</h4>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">Use least privilege with IAM roles</li>
          <li class="list-group-item">Configure VPCs for network isolation</li>
          <li class="list-group-item">Enable MFA for all users</li>
          <li class="list-group-item">Monitor with AWS CloudTrail</li>
        </ul>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-light">
                <h5>IAM Tip</h5>
              </div>
              <div class="card-body">
                <p>Always audit IAM policies regularly.</p>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // Initialize Blog Modals
  function initBlogModals() {
    const blogModal = new bootstrap.Modal(document.getElementById("blogDetailModal"));
    document.querySelectorAll(".blog-post .btn-primary").forEach(button => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const postId = this.closest(".blog-post").getAttribute("data-post-id") || this.getAttribute("data-post-id");
        if (postId && blogPosts[postId]) {
          const post = blogPosts[postId];
          document.getElementById("blogModalTitle").textContent = post.title;
          document.getElementById("blogModalDate").textContent = post.date;
          document.getElementById("blogModalCategory").textContent = post.category;
          document.getElementById("blogModalImage").src = post.image;
          document.getElementById("blogModalImage").alt = post.title;
          document.getElementById("blogModalContent").innerHTML = post.content;
          blogModal.show();
        }
      });
    });
  }
  initBlogModals();

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));

  document.getElementById("successModal").addEventListener("hidden.bs.modal", () => {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  });

  document.getElementById("errorModal").addEventListener("hidden.bs.modal", () => {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  });

  document.getElementById("experienceModal").addEventListener("hidden.bs.modal", () => {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.querySelector(".modal.show")) return;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      fetch(contactForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      })
        .then(response => {
          if (response.ok) {
            contactForm.reset();
            successModal.show();
          } else {
            errorModal.show();
          }
        })
        .catch(() => {
          errorModal.show();
        });
    } else {
      errorModal.show();
    }
  });

  // Chatbot
  const chatbot = document.getElementById("chatbot");
  const chatbotToggle = document.getElementById("chatbotToggle");
  const closeChatbot = document.getElementById("closeChatbot");
  const chatbotInput = document.getElementById("chatbotInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatbotBody = document.getElementById("chatbotBody");

  if (chatbotToggle && chatbot) {
    chatbotToggle.addEventListener("click", function () {
      chatbot.style.display = "block";
      chatbotInput.focus();
    });
  }

  if (closeChatbot && chatbot) {
    closeChatbot.addEventListener("click", function () {
      chatbot.style.display = "none";
    });
  }

  const responses = {
    hi: "Hey! I'm Vuyi's Bot, here to talk about Vuyi's cloud engineering projects, AWS skills, or how to connect. What's up?",
    hello: "Hi there! Want to dive into Vuyi's world of cloud computing and DevOps? Ask away!",
    projects: "Vuyi's projects are cutting-edge! Check out Web Hosting on AWS, Infrastructure as Code, and CI/CD pipelines in the Projects section.",
    contact: "Reach Vuyi at vuyi.mafu@gmail.com or WhatsApp at +263 777 122 948. The Contact section has a form to send a message!",
    resume: "Vuyi's resume highlights cloud engineering expertise, AWS certifications, and DevOps experience. Scroll to the Resume section to explore!",
    skills: "Vuyi's skilled in AWS, Python, Docker, Terraform, and Ansible. Want details on a specific skill?",
    blog: "Vuyi's blog covers cloud computing and DevOps. Check out posts on serverless apps, CI/CD, and AWS security in the Blog section!",
    default: "Not sure about that one! Try asking about projects, skills, blog, or contact info."
  };

  function addMessage(text, type) {
    const message = document.createElement("div");
    message.classList.add("message", type);
    message.style.opacity = "0";
    message.textContent = text;
    chatbotBody.appendChild(message);
    setTimeout(() => {
      message.style.opacity = "1";
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 100);
  }

  if (sendMessage && chatbotInput) {
    sendMessage.addEventListener("click", function () {
      const input = chatbotInput.value.trim().toLowerCase();
      if (!input) return;
      addMessage(input, "user");
      const response = responses[input] || responses.default;
      setTimeout(() => addMessage(response, "bot"), 800);
      chatbotInput.value = "";
    });

    chatbotInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage.click();
    });
  }

  // Navbar Active State
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarNav");
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll(".section, #home");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 70) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
});