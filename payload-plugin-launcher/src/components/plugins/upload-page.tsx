import useTabStore from '@/stores/useTabsStore';
import { Button } from '../ui/button';
import { FileUpload } from '../ui/file-upload';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import { TrashIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PluginParam {
    id: number;
    command: string;
}

interface PluginFormData {
    name: string;
    description: string;
    type: string;
    params: PluginParam[];
    file: File | null;
}

const PluginParameter: React.FC<{
    param: PluginParam;
    index: number;
    total: number;
    onMove: (id: number, direction: 'up' | 'down') => void;
    onRemove: (id: number) => void;
}> = ({ param, index, total, onMove, onRemove }) => (
    <div className="flex items-center justify-between bg-mixed-300 rounded-md p-2">
        <Label className="font-mono text-green-400 truncate">
            #{param.id} {param.command}
        </Label>
        <div className="flex space-x-2">
            <button
                title="Move up"
                type="button"
                onClick={() => onMove(param.id, 'up')}
                disabled={index === 0}
                className={cn(
                    'hover:bg-mixed-200 p-2 rounded-full',
                    index === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
            >
                <ChevronUpIcon size={16} className="text-slate-300" />
            </button>
            <button
                title="Move down"
                type="button"
                onClick={() => onMove(param.id, 'down')}
                disabled={index === total - 1}
                className={cn(
                    'hover:bg-mixed-200 p-2 rounded-full',
                    index === total - 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
            >
                <ChevronDownIcon size={16} className="text-slate-300" />
            </button>
            <button
                title="Remove"
                type="button"
                onClick={() => onRemove(param.id)}
                className="hover:bg-mixed-200 p-2 rounded-full cursor-pointer"
            >
                <TrashIcon size={16} className="text-red-400" />
            </button>
        </div>
    </div>
);

export default function UploadPage() {
    const { goToPrevContent, activeTab } = useTabStore();
    const [formData, setFormData] = useState<PluginFormData>({
        name: '',
        description: '',
        type: '',
        params: [],
        file: null,
    });
    const [currentParam, setCurrentParam] = useState('');
    const [nextId, setNextId] = useState(1);

    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (value: string) => {
        setFormData(prev => ({ ...prev, type: value }));
    };

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            setFormData(prev => ({ ...prev, file: files[0] }));
        }
    };

    const handleAddParam = () => {
        if (currentParam.trim()) {
            setFormData(prev => ({
                ...prev,
                params: [...prev.params, { id: nextId, command: currentParam.trim() }],
            }));
            setCurrentParam('');
            setNextId(nextId + 1);
        }
    };

    const handleRemoveParam = (id: number) => {
        setFormData(prev => ({
            ...prev,
            params: prev.params.filter((param) => param.id !== id),
        }));
    };

    const moveParam = (id: number, direction: 'up' | 'down') => {
        const index = formData.params.findIndex((param) => param.id === id);
        if (
            (direction === 'up' && index > 0) ||
            (direction === 'down' && index < formData.params.length - 1)
        ) {
            const newParams = [...formData.params];
            const [movedItem] = newParams.splice(index, 1);
            newParams.splice(
                direction === 'up' ? index - 1 : index + 1,
                0,
                movedItem
            );
            setFormData(prev => ({ ...prev, params: newParams }));
        }
    };


    const submitPlugin = async (formData: PluginFormData) => {
        if (!formData.file) {
            toast({
                title: 'Please upload a plugin file',
                variant: 'destructive',
            });
            return;
        }

        const pluginData = new FormData();
        pluginData.append('name', formData.name);
        pluginData.append('description', formData.description);
        pluginData.append('type', formData.type);
        pluginData.append('params', JSON.stringify(formData.params));
        pluginData.append('file', formData.file);

        try {
            const response = await fetch('/api/plugins', {
                method: 'POST',
                body: pluginData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload plugin');
            }

            const result = await response.json();
            toast({
                title: 'Plugin uploaded successfully',
                description: result.message,
            });
            // Optionally, you can reset the form or navigate to another page here
        } catch (error: any) {
            console.error('Error uploading plugin:', error);
            toast({
                title: 'Failed to upload plugin',
                description: error.message,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitPlugin(formData);
    };

    return (
        <div className="flex flex-col gap-4 p-4 min-h-screen">
            <div>
                <Button onClick={() => goToPrevContent(activeTab)} className="w-32">
                    Back to Main
                </Button>
            </div>
            <Card className="w-full">
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        <div className="sm:col-span-1">
                            <Label htmlFor="name">Plugin Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <Label htmlFor="type">Plugin Type</Label>
                            <Select
                                onValueChange={handleTypeChange}
                                required
                                value={formData.type}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select plugin type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="type-1">Type 1</SelectItem>
                                    <SelectItem value="type-2">Type 2</SelectItem>
                                    <SelectItem value="type-3">Type 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-full">
                            <Label htmlFor="description">Plugin Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                className="resize-none"
                                rows={3}
                                maxLength={200}
                            />
                        </div>
                        <div className="col-span-full">
                            <Label htmlFor="params">Plugin Parameters</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                <Input
                                    id="params"
                                    value={currentParam}
                                    onChange={(e) => setCurrentParam(e.target.value)}
                                    placeholder={`Example: ${formData.type === 'type-1'
                                        ? 'npm install'
                                        : formData.type === 'type-2'
                                            ? 'python -m venv env'
                                            : formData.type === 'type-3'
                                                ? 'gradle build'
                                                : 'Select a plugin type to see example parameters'
                                        }`}
                                    className="font-mono bg-mixed-200 text-green-400 sm:col-span-3"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddParam}
                                    className="w-full sm:w-32"
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                                {formData.params.map((param, index) => (
                                    <PluginParameter
                                        key={param.id}
                                        param={param}
                                        index={index}
                                        total={formData.params.length}
                                        onMove={moveParam}
                                        onRemove={handleRemoveParam}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full">
                            <Label>Plugin File</Label>
                            <FileUpload onChange={handleFileChange} />
                        </div>
                        <Button type="submit" className="w-full sm:w-48">
                            Upload Plugin
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}