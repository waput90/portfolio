type Skill = {
  name: string
  level: number
}

type Experience = {
  role: string
  period: string
  company: string
  highlights: string[]
}

type Project = {
  title: string
  image: string
  href: string
  impacts: string[]
}

type Testimonial = {
  name: string
  role?: string
  context?: string
  themes?: string[]
  quote: string
}

type AggregateInsights = {
  strongestThemes: string[]
  careerSignals: string[]
}

export const skills: Skill[] = [
  { name: 'HTML', level: 100 },
  { name: 'CSS', level: 85 },
  { name: 'C#', level: 80 },
  { name: 'JavaScript', level: 85 },
  { name: 'ReactJS', level: 65 },
  { name: 'Angular', level: 55 },
  { name: '.NET Core', level: 85 },
  { name: 'Communication', level: 75 },
]

export const projects: Project[] = [
  {
    title: 'ProfitFarmers',
    image: '/images/portfolio/portfolio-1.jpg',
    href: 'https://www.profitfarmers.com/',
    impacts: ['Contributed to production feature delivery', 'Supported release readiness and quality checks'],
  },
  {
    title: 'MyCRM Finance',
    image: '/images/portfolio/portfolio-2.jpg',
    href: 'https://mycrm.finance',
    impacts: ['Handled legacy and modern app fixes', 'Built privacy consent and workflow enhancements'],
  },
  {
    title: 'Koboom',
    image: '/images/portfolio/portfolio-3.jpg',
    href: 'https://koboom.kr/',
    impacts: ['Supported full stack feature updates', 'Improved maintainability through refactoring'],
  },
  {
    title: 'Propillo',
    image: '/images/portfolio/portfolio-4.jpg',
    href: 'https://propillo.com/',
    impacts: ['Maintained mortgage platform features', 'Integrated external APIs and payment services'],
  },
  {
    title: 'Witz Group',
    image: '/images/portfolio/portfolio-5.jpg',
    href: 'https://www.witzgroup.com/',
    impacts: ['Delivered backend service improvements', 'Contributed to API troubleshooting and reliability'],
  },
  {
    title: 'Interactive Partners',
    image: '/images/portfolio/portfolio-6.jpg',
    href: 'https://interactivepartners.com.au/',
    impacts: ['Implemented API integrations for clients', 'Accelerated feature delivery with practical architecture'],
  },
]

export const experiences: Experience[] = [
  {
    role: 'Senior Software Engineer',
    period: '2023 - Present',
    company: 'ConnectOS - LoanMarket, Australia',
    highlights: [
      'Create new features for insurance tools',
      'Collaborate through PR reviews and planning cycles',
      'Fix issues across both legacy and latest MyCRM apps',
      'Integrate privacy consent features',
    ],
  },
  {
    role: '.NET Consultant',
    period: '2022 - 2023',
    company: 'DevPartners - LoanMarket, Australia',
    highlights: [
      'Integrated BlackFin APIs',
      'Built features on the insurance stream',
      'Led bug hunting and production fixes',
      'Reviewed and approved pull requests',
    ],
  },
  {
    role: '.NET Developer',
    period: '2021 - 2022',
    company: 'Interactive Partners, Australia',
    highlights: [
      'Implemented API integrations and code refactoring',
      'Set up new client applications',
      'Added end-to-end features for business workflows',
    ],
  },
  {
    role: '.NET Backend Developer',
    period: '2021',
    company: 'Witz Industries, USA',
    highlights: [
      'Integrated Amazon APIs',
      'Built unit tests for services',
      'Troubleshot and maintained API services',
    ],
  },
  {
    role: '.NET Developer',
    period: '2020 - 2022',
    company: 'Witty Manager, Korea',
    highlights: [
      'Built commission management systems',
      'Delivered POS back office and insight reports',
      'Developed ERC-20 token work on Ethereum',
    ],
  },
  {
    role: 'Junior .NET Developer',
    period: '2018 - 2021',
    company: 'Advallu, Philippines',
    highlights: [
      'Integrated Crypto Broker, PayPal, and CoinPayments APIs',
      'Maintained and enhanced mortgage web platforms',
      'Applied SOLID principles and async/await patterns',
    ],
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'John',
    role: 'Senior Software Engineer',
    context: 'Worked with James on different teams',
    themes: ['Technical Excellence', 'Deployment', 'Code Reviews', 'Reliability'],
    quote:
      'James is one of those colleagues who is always willing to help. He is knowledgeable, responsive, and easy to work with. Whether it is deployment issues, release processes, or pull request reviews, he is always happy to share guidance and point people in the right direction. He stays calm under pressure, communicates clearly, and maintains a positive attitude even during busy release days. His support and reliability make him a valuable teammate and someone the team can depend on.',
  },
  {
    name: 'Raymarc',
    role: 'Senior Software Engineer | C# | .NET | Azure',
    context: 'Worked with James on the same team',
    themes: ['React', 'Angular', 'Teamwork', 'Backend Development'],
    quote:
      'James is not just an exceptional developer but also a great friend outside of work. We do not get to hang out often since we live so far apart, but when we do meet up at company events, we are always vibing and having a great time. Beyond his solid skills in frontend (React and Angular especially) and backend, he is the guy you can rely on for a fresh perspective or a quick hand when you are stuck. To be honest, he is the teammate you want in your corner. I work closely with him and can vouch for all that good stuff he brings to the table.',
  },
  {
    name: 'Mark',
    role: 'IT Instructor / LPT / MIT / MTRCE / MTCNA',
    context: "James's teacher",
    themes: ['Programming Talent', 'Continuous Improvement', 'Team Player'],
    quote:
      'James is an exceptional developer who possesses all the skills one would want in an excellent software developer. He masters top programming languages and consistently delivered outstanding project work during his college years. His work is always high quality, he welcomes feedback, continuously improves, and is a self-motivated team player.',
  },
  {
    name: 'Chui',
    role: 'Engineering Lead',
    context: 'Managed James directly',
    themes: ['Mentorship', 'Business Acumen', 'Communication', 'Delivery'],
    quote:
      'James is not only technically strong and fast with his work, but also a team player who supports junior developers and helps ensure successful delivery. One of the things you can count on when working with James is that he understands business context and actively seeks clarification to make sure solutions align with business needs.',
  },
  {
    name: 'Rowell',
    role: 'Engineering Teammate',
    context: 'Worked with James at LoanMarket',
    themes: ['React', 'Software Development', 'Fast Learner', 'Teamwork', 'Delivery'],
    quote:
      'James was a vital member of our development team at LoanMarket. He demonstrated strong software development skills, particularly in ReactJS, learned new technologies quickly, embraced challenges, collaborated effectively with teammates, and consistently delivered high-quality software on time.',
  },
  {
    name: 'Andrian',
    role: 'Engineering Teammate',
    context: 'Worked with James in a senior team setup',
    themes: ['Leadership', 'Mentorship', 'Knowledge Sharing', 'Team Enablement'],
    quote:
      'James served as a senior developer and mentor to junior developers. He introduced new development techniques, encouraged colleagues, shared knowledge, and helped teams improve their capabilities and reach project milestones.',
  },
  {
    name: 'Matthew',
    role: 'Engineering Teammate',
    context: 'Worked with James in backend-focused initiatives',
    themes: ['Backend Development', 'Problem Solving', 'Growth'],
    quote:
      'James showed rapid growth, dedication, passion for programming, and strong backend problem-solving abilities. He was recognized as being on the path to becoming an excellent software engineer.',
  },
  {
    name: 'Allem',
    role: 'Engineering Teammate',
    context: 'Worked with James in team delivery',
    themes: ['Continuous Learning', 'Team Support', 'Work Ethic'],
    quote:
      'James is a hard-working programmer, enthusiastic about learning new technologies, and consistently assists teammates when problems arise.',
  },
  {
    name: 'Warren',
    role: 'Engineering Teammate',
    context: 'Worked with James in programming projects',
    themes: ['Fast Learner', 'Programming', 'Technical Excellence'],
    quote:
      'James is a fast learner whose programming skills made him a standout member of the team.',
  },
  {
    name: 'Andrea',
    role: 'Engineering Teammate',
    context: 'Worked with James in frontend collaboration',
    themes: ['Frontend Development', 'React', 'Teamwork'],
    quote:
      'James has extensive frontend knowledge and is an excellent teammate to work with.',
  },
  {
    name: 'Emil',
    role: 'Engineering Teammate',
    context: 'Worked with James in technical solutioning',
    themes: ['Technical Expertise', 'Collaboration', 'Reliability', 'Problem Solving'],
    quote:
      'James is highly committed, always willing to help, possesses extensive developer expertise, contributes to effective technical solutions, and is someone colleagues would gladly work with again.',
  },
  {
    name: 'Hilarion',
    role: 'Engineering Teammate',
    context: 'Worked with James in client-facing delivery',
    themes: ['Frontend Development', 'Client Delivery', 'Critical Thinking'],
    quote:
      'James demonstrated exceptional content management and frontend development skills, solved problems effectively, and consistently delivered work that satisfied client requirements.',
  },
  {
    name: 'Emmanuel',
    role: 'Engineering Teammate',
    context: 'Worked with James in full stack problem solving',
    themes: ['Full Stack Development', 'Problem Solving', 'Coding Standards'],
    quote:
      'James is an experienced full-stack developer capable of solving critical technical problems and applying coding standards effectively.',
  },
  {
    name: 'Richard',
    role: 'Academic Mentor',
    context: 'Mentored James during student years',
    themes: ['Academic Excellence', 'Programming Talent', 'Learning Mindset'],
    quote:
      'James was recognized as a leading student with a strong desire to learn and a talent for programming.',
  },
  {
    name: 'Al-habzi',
    role: 'Professional Peer',
    context: 'Worked with James in engineering and security discussions',
    themes: ['Programming', 'Systems Security', 'Professionalism'],
    quote:
      'James is an excellent professional with expertise in programming and systems security.',
  },
]

export const aggregateInsights: AggregateInsights = {
  strongestThemes: [
    'Technical Excellence',
    'Frontend Development',
    'React',
    'Full Stack Development',
    'Mentorship',
    'Leadership',
    'Problem Solving',
    'Fast Learner',
    'Team Collaboration',
    'Business Understanding',
  ],
  careerSignals: [
    'Trusted senior engineer',
    'Mentor for junior developers',
    'Strong React and frontend expertise',
    'Capable full-stack developer',
    'Business-aware technical contributor',
    'Reliable delivery-focused engineer',
    'Strong collaborator and teammate',
  ],
}