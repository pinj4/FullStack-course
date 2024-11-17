export interface HeaderProps {
  name: string;
};

export interface CoursePart {
  name: string;
  exerciseCount: number;
};
  
export interface CourseProps {
  courseParts: CoursePart[];
};
