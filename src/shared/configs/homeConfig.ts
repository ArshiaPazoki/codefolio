// src/shared/configs/homeConfig.ts

export interface CodeLine {
    code: string;
    type:
      | 'function'
      | 'variable'
      | 'array-item'
      | 'array-end'
      | 'blank'
      | 'nested-function'
      | 'return'
      | 'function-call'
      | 'close'
      | 'return-object'
      | 'object-method'
      | 'close-function';
  }
  
  export const codeLines: CodeLine[] = [
    { code: 'const HomePage = () => {', type: 'function' },
    { code: '  const [isLoaded, setIsLoaded] = useState(true);', type: 'variable' },
    { code: '  const developerInfo = {', type: 'variable' },
    { code: "    name: 'Arshia Pazoki',", type: 'array-item' },
    { code: "    role: 'Senior Test Automation Engineer & SDET',", type: 'array-item' },
    { code: "    bio: 'building scalable automation frameworks and full-stack applications.',", type: 'array-item' },
    { code: '  };', type: 'array-end' },
    { code: '', type: 'blank' },
    { code: '  useEffect(() => {', type: 'nested-function' },
    { code: '    document.title = `${developerInfo.name} | Portfolio`;', type: 'return' },
    { code: '    setIsLoaded(true);', type: 'function-call' },
    { code: '  }, []);', type: 'close' },
    { code: '', type: 'blank' },
    { code: '  return (', type: 'return-object' },
    { code: '    <main className="hero-container">', type: 'object-method' },
    { code: '      <h1>{developerInfo.name}</h1>', type: 'object-method' },
    { code: '      <p>{developerInfo.role}</p>', type: 'object-method' },
    { code: '      <div className="cta">', type: 'object-method' },
    { code: '        <Link href="/projects">View Projects</Link>', type: 'object-method' },
    { code: '      </div>', type: 'object-method' },
    { code: '    </main>', type: 'object-method' },
    { code: '  );', type: 'close' },
    { code: '};', type: 'close-function' },
    { code: '', type: 'blank' },
    { code: 'export default HomePage;', type: 'function-call' },
  ];
  