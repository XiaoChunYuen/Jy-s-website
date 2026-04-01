export type Language = 'en' | 'zh';

export const translations = {
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      resume: 'Resume'
    },
    footer: {
      title: 'Student Portfolio',
      copyright: '© 2024 Student Portfolio',
      author: 'Alex Chen – Designer'
    },
    home: {
      hero: 'Crafting digital experiences with purpose',
      heroTitle: "Welcome to Jy's Channel",
      heroSubtitle: 'Explore · Create · Share',
      scroll: 'Scroll',
      portfolioLabel: 'Portfolio',
      portfolioTitle: 'Selected Work',
      portfolioDesc: 'A curated collection of projects spanning product design, user experience, and digital innovation.',
      getInTouch: 'Get in Touch',
      viewResume: 'View Resume',
      viewProject: 'View Project',
      project1: {
        title: 'Urban Mobility',
        category: 'UI/UX Design • 2023'
      },
      project2: {
        title: 'Fintech Dashboard',
        category: 'Product Design • 2023'
      }
    },
    caseStudy: {
      breadcrumbs: {
        work: 'Work',
        current: 'Urban Mobility Case Study'
      },
      hero: 'The Future of Urban Transit',
      process: 'Process',
      previous: 'Previous',
      backToWork: 'Back to Work',
      nextProject: 'Next Project',
      meta: {
        duration: 'Duration',
        durationValue: '12 Weeks (Fall 2023)',
        role: 'Role',
        roleValue: 'Lead UI/UX Designer',
        platform: 'Platform',
        platformValue: 'iOS & Web Dashboard',
        client: 'Client',
        clientValue: 'Metropolis Transit Auth.'
      },
      sections: {
        background: {
          title: 'Background',
          content: 'Urban congestion in the metropolitan area had reached a critical threshold, resulting in a 34% decrease in public transit efficiency over the last decade. Our objective was to redesign the core navigation engine to prioritize multimodal transit—seamlessly blending rail, bus, and micro-mobility options into a single, cohesive user experience.'
        },
        myRole: {
          title: 'My Role',
          content: 'I led the end-to-end design process, from initial stakeholder interviews to high-fidelity prototyping. Working alongside two front-end developers, I ensured that the visual language maintained the "Dynamic Editorial" aesthetic while adhering to strict accessibility standards (WCAG 2.1 AA).'
        },
        method: {
          title: 'Method',
          intro: 'We utilized a Mixed-Methods Research approach:',
          items: [
            'Contextual inquiry with 50+ daily commuters across three transit hubs.',
            'Rapid iterative prototyping using low-fidelity wireframes to test navigation flow.',
            'Quantitative analysis of existing trip-planning data to identify friction points.'
          ]
        },
        results: {
          title: 'Results',
          stat1: 'Reduction in booking time',
          stat2: 'User satisfaction rating'
        },
        reflection: {
          title: 'Reflection',
          content: 'This project taught me the importance of "graceful friction"—sometimes slowing a user down to confirm a critical multimodal connection is better than a seamless but error-prone automated journey. The Electric Blue accents served not just as branding, but as high-contrast beacons for decision-making moments.'
        }
      },
      deepDive: {
        title: 'Want the deep dive?',
        button: 'View Full Report'
      },
      gallery: {
        title: 'Project Gallery',
        phase1: 'Phase 01: Information Architecture',
        phase2: 'Phase 02: High-Fidelity Interface'
      }
    },
    about: {
      title: 'About Me',
      p1: 'I am a digital product designer with a background in architecture, which deeply influences my approach to structuring information and building scalable design systems.',
      p2: 'Currently, I focus on creating elegant, user-centric experiences for complex enterprise tools and consumer applications. I believe that good design is invisible, yet its impact is felt in every interaction.',
      p3: 'When I\'m not pushing pixels, you can find me exploring vintage typography, brewing specialty coffee, or photographing brutalist architecture.',
      resumeTitle: 'Experience & Education',
      downloadResume: 'Download PDF',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      jobs: [
        {
          title: 'Senior Product Designer',
          period: '2021 — Present',
          company: 'TechNova Solutions',
          desc: 'Led the redesign of the core enterprise dashboard, improving user task completion rate by 40%. Established and maintained the company-wide design system.'
        },
        {
          title: 'UI/UX Designer',
          period: '2018 — 2021',
          company: 'Creative Studio Alpha',
          desc: 'Collaborated with cross-functional teams to deliver responsive web applications for clients in fintech and healthcare sectors.'
        }
      ],
      eduItem: {
        degree: 'BFA in Interaction Design',
        period: '2014 — 2018',
        school: 'Rhode Island School of Design (RISD)'
      },
      skillList: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'React', 'Wireframing', 'Usability Testing']
    },
    services: {
      title: 'Services',
      whatIDo: 'What I Do',
      ctaTitle: 'Have a project in mind?',
      ctaDesc: 'I\'m always open to discussing product design work or partnership opportunities.',
      ctaButton: 'Get in Touch',
      items: [
        {
          title: 'Product Design',
          desc: 'End-to-end product design from initial concept to high-fidelity prototypes. I specialize in complex web applications and mobile experiences, ensuring every touchpoint is intuitive and aligned with business goals.'
        },
        {
          title: 'Design Systems',
          desc: 'Building scalable, accessible, and comprehensive design systems that empower engineering teams to build faster while maintaining visual consistency across all platforms.'
        },
        {
          title: 'UX Research',
          desc: 'Conducting user interviews, usability testing, and competitive analysis to uncover actionable insights that drive product strategy and validate design decisions.'
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      letsConnect: 'Let\'s Connect',
      email: 'Email',
      emailDesc: 'For project inquiries and collaborations',
      social: 'Social',
      socialDesc: 'Follow me for updates and behind-the-scenes',
      desc: 'I am always open to discussing product design work or partnership opportunities.',
      emailAddress: 'hello@example.com',
      phone: 'Phone',
      wechat: 'WeChat',
      xiaohongshu: 'Rednote'
    },
    resume: {
      subtitle: 'Resume',
      downloadPDF: 'Download PDF',
      previewPDF: 'Preview PDF',
      education: 'Education',
      internship: 'Internship Experience',
      competition: 'Competition Experience',
      campus: 'Campus Experience',
      noFile: 'Resume PDF not uploaded yet',
      educationList: [
        {
          degree: 'Bachelor of Design',
          school: 'Rhode Island School of Design',
          period: '2021 — 2025',
          description: 'Major in Interaction Design, GPA 3.8/4.0'
        }
      ],
      internshipList: [
        {
          title: 'Product Design Intern',
          company: 'TechNova Solutions',
          period: 'Summer 2024',
          description: 'Collaborated with the design team to create user interfaces for mobile applications. Conducted user research and usability testing.'
        }
      ],
      competitionList: [
        {
          title: 'UX Design Award',
          organizer: 'International Design Competition',
          period: '2024',
          description: 'Won first place in the student category for innovative mobile app design.'
        }
      ],
      campusList: [
        {
          title: 'Design Club President',
          organization: 'University Design Club',
          period: '2023 — 2024',
          description: 'Led a team of 20 students to organize design workshops and events. Increased club membership by 50%.'
        }
      ]
    }
  },
  zh: {
    nav: {
      work: '作品',
      about: '关于',
      services: '服务',
      contact: '联系',
      resume: '简历'
    },
    footer: {
      title: '学生作品集',
      copyright: '© 2024 学生作品集',
      author: 'Alex Chen – 设计师'
    },
    home: {
      hero: '用心打造数字体验',
      heroTitle: '欢迎来到 Jy 的频道',
      heroSubtitle: '探索 · 创造 · 分享',
      scroll: '滚动浏览',
      portfolioLabel: '作品集',
      portfolioTitle: '精选作品',
      portfolioDesc: '精心策划的项目集，涵盖产品设计、用户体验和数字创新。',
      getInTouch: '联系我',
      viewResume: '查看简历',
      viewProject: '查看项目',
      project1: {
        title: '城市出行',
        category: 'UI/UX 设计 • 2023'
      },
      project2: {
        title: '金融科技仪表盘',
        category: '产品设计 • 2023'
      }
    },
    caseStudy: {
      breadcrumbs: {
        work: '作品',
        current: '城市出行案例研究'
      },
      hero: '城市交通的未来',
      process: '过程',
      previous: '上一个',
      backToWork: '返回作品',
      nextProject: '下一个项目',
      meta: {
        duration: '周期',
        durationValue: '12周 (2023秋季)',
        role: '角色',
        roleValue: '首席 UI/UX 设计师',
        platform: '平台',
        platformValue: 'iOS & Web 仪表盘',
        client: '客户',
        clientValue: '大都会交通局'
      },
      sections: {
        background: {
          title: '背景',
          content: '大都市区的城市拥堵已达到临界点，导致过去十年公共交通效率下降了34%。我们的目标是重新设计核心导航引擎，优先考虑多模式交通——将铁路、公交和微型交通选项无缝融合到一个连贯的用户体验中。'
        },
        myRole: {
          title: '我的角色',
          content: '我领导了端到端的设计过程，从最初的利益相关者访谈到高保真原型设计。与两名前端开发人员合作，我确保视觉语言保持“动态编辑”的美感，同时遵守严格的可访问性标准 (WCAG 2.1 AA)。'
        },
        method: {
          title: '方法',
          intro: '我们采用了混合方法研究：',
          items: [
            '在三个交通枢纽对50多名日常通勤者进行情境调查。',
            '使用低保真线框进行快速迭代原型设计，以测试导航流程。',
            '对现有行程规划数据进行定量分析，以识别摩擦点。'
          ]
        },
        results: {
          title: '结果',
          stat1: '预订时间减少',
          stat2: '用户满意度评分'
        },
        reflection: {
          title: '反思',
          content: '这个项目教会了我“优雅摩擦”的重要性——有时让用户慢下来确认关键的多模式连接，比无缝但容易出错的自动化旅程更好。电光蓝的口音不仅作为品牌标识，而且作为决策时刻的高对比度信标。'
        }
      },
      deepDive: {
        title: '想深入了解？',
        button: '查看完整报告'
      },
      gallery: {
        title: '项目图库',
        phase1: '阶段 01: 信息架构',
        phase2: '阶段 02: 高保真界面'
      }
    },
    about: {
      title: '关于我',
      p1: '我是一名拥有建筑学背景的数字产品设计师，这深刻影响了我构建信息和构建可扩展设计系统的方法。',
      p2: '目前，我专注于为复杂的企业工具和消费者应用程序创建优雅的、以用户为中心的体验。我相信好的设计是无形的，但它的影响在每一次互动中都能感受到。',
      p3: '当我不沉迷于像素时，你会发现我在探索复古排版、冲泡特色咖啡或拍摄粗野主义建筑。',
      resumeTitle: '经历与教育',
      downloadResume: '下载 PDF',
      experience: '工作经历',
      education: '教育背景',
      skills: '技能',
      jobs: [
        {
          title: '高级产品设计师',
          period: '2021 — 至今',
          company: 'TechNova Solutions',
          desc: '领导核心企业仪表盘的重新设计，将用户任务完成率提高了40%。建立并维护了全公司的设计系统。'
        },
        {
          title: 'UI/UX 设计师',
          period: '2018 — 2021',
          company: 'Creative Studio Alpha',
          desc: '与跨职能团队合作，为金融科技和医疗保健领域的客户交付响应式 Web 应用程序。'
        }
      ],
      eduItem: {
        degree: '交互设计美术学士',
        period: '2014 — 2018',
        school: '罗德岛设计学院 (RISD)'
      },
      skillList: ['Figma', '原型设计', '用户研究', '设计系统', 'HTML/CSS', 'React', '线框图', '可用性测试']
    },
    services: {
      title: '服务',
      whatIDo: '我的服务',
      ctaTitle: '有项目想法？',
      ctaDesc: '我随时乐意讨论产品设计工作或合作机会。',
      ctaButton: '联系我',
      items: [
        {
          title: '产品设计',
          desc: '从初始概念到高保真原型的端到端产品设计。我专注于复杂的 Web 应用程序和移动体验，确保每个接触点都直观且符合业务目标。'
        },
        {
          title: '设计系统',
          desc: '构建可扩展、可访问且全面的设计系统，使工程团队能够更快地构建，同时保持所有平台的视觉一致性。'
        },
        {
          title: '用户体验研究',
          desc: '进行用户访谈、可用性测试和竞争分析，以发现可操作的见解，从而推动产品战略并验证设计决策。'
        }
      ]
    },
    contact: {
      title: '联系我',
      letsConnect: '保持联系',
      email: '邮箱',
      emailDesc: '项目咨询与合作',
      social: '社交媒体',
      socialDesc: '关注我获取最新动态',
      desc: '我随时乐意讨论产品设计工作或合作机会。',
      emailAddress: 'hello@example.com',
      phone: '电话',
      wechat: '微信',
      xiaohongshu: '小红书'
    },
    resume: {
      subtitle: '个人简历',
      downloadPDF: '下载 PDF',
      previewPDF: '预览 PDF',
      education: '教育背景',
      internship: '实习经历',
      competition: '竞赛经历',
      campus: '校园经历',
      noFile: '尚未上传简历 PDF',
      educationList: [
        {
          degree: '设计学士',
          school: '罗德岛设计学院',
          period: '2021 — 2025',
          description: '交互设计专业，GPA 3.8/4.0'
        }
      ],
      internshipList: [
        {
          title: '产品设计实习生',
          company: 'TechNova Solutions',
          period: '2024 暑期',
          description: '与设计团队合作创建移动应用用户界面，进行用户研究和可用性测试。'
        }
      ],
      competitionList: [
        {
          title: 'UX 设计奖',
          organizer: '国际设计大赛',
          period: '2024',
          description: '凭借创新的移动应用设计获得学生组一等奖。'
        }
      ],
      campusList: [
        {
          title: '设计俱乐部主席',
          organization: '大学设计俱乐部',
          period: '2023 — 2024',
          description: '带领 20 人团队组织设计工作坊和活动，会员人数增长 50%。'
        }
      ]
    }
  }
};
