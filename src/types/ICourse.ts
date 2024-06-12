

export interface CourseFirst {
    title: string;
    description: string;
    thumbnail: string;
    language?: string;
    category?: string;
    pricing?: string;
    video?: string;
}



export interface Lesson {
    lessonNumber?: string,
    title?: string;
    description?: string;
    thumbnail?: string;
    video?: string;
    duration?: string;
    objectives?: string[];
}

interface Trial {
    video?: string;
}

interface Attachments {
    title?: string;
    url?: string;
}

enum PricingType {
    free = 'free',
    paid = 'paid'
}

interface Pricing {
    amount?: number;
    type?: PricingType;
}

enum Level {
    beginner = 'beginner',
    intermediate = 'intermediate',
    advanced = 'expert'
}
export interface CourseEntity {
    _id?:string;
    title?: string;
    description?: string;
    thumbnail?: string;
    categoryRef?: string;
    instructorRef?: string;
    language?: string;
    lessons?: [Lesson]
    trial?: Trial;
    level?: Level;
    attachments?: Attachments;
    pricing?: Pricing;
    isRequested?: boolean;
    isPublished?: boolean;
    isBlocked?: boolean;
}
