import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PluginsPage() {
    return (
        <div className="flex flex-col w-full gap-4 ">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Plugin 1</CardTitle>
                    <CardDescription>Plugin description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Plugin content</p>
                </CardContent>
                <CardFooter>
                    <Button>Install</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Plugin 1</CardTitle>
                    <CardDescription>Plugin description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Plugin content</p>
                </CardContent>
                <CardFooter>
                    <Button>Install</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Plugin 1</CardTitle>
                    <CardDescription>Plugin description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Plugin content</p>
                </CardContent>
                <CardFooter>
                    <Button>Install</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Plugin 1</CardTitle>
                    <CardDescription>Plugin description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Plugin content</p>
                </CardContent>
                <CardFooter>
                    <Button>Install</Button>
                </CardFooter>
            </Card>


        </div>
    );
}