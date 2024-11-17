export interface HeaderProps {
  name: string;
};

export interface CourseProps {
  courseParts: CoursePart[];
};

export interface PartProps {
  part: CoursePart;
};

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
};

export interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
};

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
};

export interface CoursePartBasic extends CoursePartBaseDesc {
  // description: string;
  kind: "basic"
};

export interface CoursePartBackground extends CoursePartBaseDesc {
  // description: string;
  backgroundMaterial: string;
  kind: "background"
};

export interface CoursePartSpecial extends CoursePartBaseDesc {
  requirements: string[];
  kind: 'special'
};

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
