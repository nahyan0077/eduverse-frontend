

export interface CourseFirst {
    title: string;
    description: string;
    thumbnail: string;
    language?: string;
    category?: string;
    pricing?: string;
    video?: string;
}



interface Lesson {
    lessonNumber?: string,
    title?: string;
    description?: string;
    thumbnail?: string;
    video?: string;
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

export interface CourseEntity {
    title?: string;
    description?: string;
    thumbnail?: string;
    language?: string;
    lessons?: [Lesson]
    trial?: Trial;
    attachments?: Attachments;
    pricing?: Pricing;
}
