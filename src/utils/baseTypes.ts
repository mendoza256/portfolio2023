export type ProjectType = {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  github: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  technologies: string[];
};
