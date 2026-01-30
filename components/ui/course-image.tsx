'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';

interface CourseImageProps extends Omit<ImageProps, 'src'> {
    src?: string;
    courseName?: string;
    className?: string;
}

export function CourseImage({
    src,
    courseName = 'Course',
    alt,
    className = '',
    ...props
}: CourseImageProps) {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Reset states when src changes
        setHasError(false);

        if (!src) {
            setImgSrc('');
            return;
        }

        // Check if the image exists
        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            setImgSrc(src);
            setHasError(false);
        };

        img.onerror = () => {
            setImgSrc('');
            setHasError(true);
        };
    }, [src]);

    if (hasError || !imgSrc) {
        return (
            <div className={`relative w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground line-clamp-2">{courseName}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">Course Preview</span>
                </div>
            </div>
        );
    }

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}