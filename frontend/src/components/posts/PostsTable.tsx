import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {posts} from '@/components/Data/posts';
import { Post } from './posts';
import Link from 'next/link';
import {Button} from '@/components/ui/button';


interface PostsTableProps {
    limit?: number;
    title?: string;
}
export default function PostsTable({limit,title}: PostsTableProps) {
    return (
        <div className='mt-10'>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
        <Table>
            <TableCaption>list of recent posts</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell><Link href={`/posts/edit/${post.id}`}><Button>Edit</Button></Link></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}