import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Bookmark, Download } from 'lucide-react';

interface StorePluginProps {
    id: string;
    name: string;
    description: string;
    likes: number;
    comments: { user: string; text: string }[];
}

const StorePluginCard: React.FC<StorePluginProps> = ({ id, name, description, likes, comments }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleLike = () => {
        setIsLiked(!isLiked);
        // TODO: Implement like functionality with backend
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        // TODO: Implement save functionality with backend
    };

    const handleDownload = () => {
        // TODO: Implement download functionality
    };

    const handleAddComment = () => {
        // TODO: Implement add comment functionality with backend
        setNewComment('');
    };

    return (
        <Card className="bg-mixed-300">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-4">{description}</p>
                <div className="flex justify-between items-center mb-4">
                    <Button variant="ghost" onClick={handleLike}>
                        <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'text-blue-500' : ''}`} />
                        {likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" onClick={() => setShowComments(!showComments)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {comments.length}
                    </Button>
                    <Button variant="ghost" onClick={handleSave}>
                        <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'text-yellow-500' : ''}`} />
                        Save
                    </Button>
                    <Button variant="default" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
                {showComments && (
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <strong>{comment.user}: </strong>
                                {comment.text}
                            </div>
                        ))}
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="mb-2"
                        />
                        <Button onClick={handleAddComment}>Add Comment</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StorePluginCard;