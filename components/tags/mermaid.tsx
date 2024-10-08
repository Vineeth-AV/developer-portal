
import mermaidAPI from 'mermaid';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Theme } from 'types';

type Props = {
  value: string;
};

const MermaidDiagram = ({ value }: Props) => {
  const { resolvedTheme } = useTheme();
  const mermaidTheme = resolvedTheme === Theme.Dark ? 'dark' : 'default';

  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateDiagramId = () => {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 10000);
      return `mermaid-${timestamp}-${randomNum}`;
    };

    const renderDiagram = async () => {
      try {
        const diagramId = generateDiagramId();
        await mermaidAPI.initialize({
          startOnLoad: false,
          theme: mermaidTheme
        });
        const renderResult = await mermaidAPI.render(diagramId, value);
        setSvg(renderResult.svg);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setSvg('');
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [value, mermaidTheme]);

  // TODO: Add loading indicator
  if (isLoading) return <div>Loading diagram...</div>;

  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
