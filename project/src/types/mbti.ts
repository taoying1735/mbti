import { CropIcon as IconProps } from 'lucide-react';

export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1; // 1 for first letter, -1 for second letter
}

export interface Answer {
  questionId: number;
  score: number; // 1-5
}

export type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export type MBTIResult = `${MBTIType}${MBTIType}${MBTIType}${MBTIType}`;
export type TestVersion = 'easy' | 'standard' | 'professional';

export interface TestResult {
  id: string;
  date: string;
  type: MBTIResult;
  version: TestVersion;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

export interface TypeDescription {
  title: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  growth: string[];
  relationships: {
    strengths: string[];
    challenges: string[];
  };
  workStyle: {
    preferences: string[];
    challenges: string[];
  };
  learningStyle: {
    preferences: string[];
    strategies: string[];
  };
  stressManagement: {
    triggers: string[];
    copingStrategies: string[];
  };
  communicationStyle: {
    strengths: string[];
    challenges: string[];
    tips: string[];
  };
  values: string[];
  hobbies: string[];
  inspirationalFigures: string[];
}

export interface TypeDescriptions {
  [key: string]: TypeDescription;
}