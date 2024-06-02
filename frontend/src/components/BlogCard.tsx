import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Blog }from "@/components/BlogTableColumns"
  interface BlogCardProps {
    blog: Blog;
  }
  export default function BlogCard ({blog}: BlogCardProps) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>{blog.name}</AccordionTrigger>
                <AccordionContent>
                {blog.description}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
  }