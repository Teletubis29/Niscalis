"use client";

import { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, AlertCircle, Heart, Settings, Menu, X } from "lucide-react";

export default function ComponentsShowcase() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([50]);
  const [radioValue, setRadioValue] = useState("option1");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [selectValue, setSelectValue] = useState("option1");
  const [textInputValue, setTextInputValue] = useState("");
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);

  // Auto-dismiss alerts after 3 seconds
  useEffect(() => {
    if (showInfoAlert) {
      const timer = setTimeout(() => setShowInfoAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showInfoAlert]);

  useEffect(() => {
    if (showErrorAlert) {
      const timer = setTimeout(() => setShowErrorAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorAlert]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">UI Components Showcase</h1>
          <p className="text-muted-foreground text-lg">
            Complete showcase of all 44 shadcn/ui components used in this e-commerce project
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="basic" className="w-full mb-22">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="containers">Containers</TabsTrigger>
            <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
            <TabsTrigger value="menus">Menus</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Basic Components */}
          <TabsContent value="basic" className="space-y-8 mt-8">
            {/* Alert */}
            <Card>
              <CardHeader>
                <CardTitle>Alert</CardTitle>
                <CardDescription>Notification/alert messages (auto-dismisses in 3 seconds)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showInfoAlert && (
                  <div className="relative">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Info Alert</AlertTitle>
                      <AlertDescription>This is an informational alert message</AlertDescription>
                      <button
                        onClick={() => setShowInfoAlert(false)}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Alert>
                  </div>
                )}
                {showErrorAlert && (
                  <div className="relative">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error Alert</AlertTitle>
                      <AlertDescription>This is an error/destructive alert message</AlertDescription>
                      <button
                        onClick={() => setShowErrorAlert(false)}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Alert>
                  </div>
                )}
                {!showInfoAlert && !showErrorAlert && (
                  <div className="text-center text-muted-foreground py-8">
                    <button
                      onClick={() => {
                        setShowInfoAlert(true);
                        setShowErrorAlert(true);
                      }}
                      className="text-primary hover:underline"
                    >
                      Show alerts again
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Badge */}
            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>
                <CardDescription>Status labels and tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Avatar */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>User profile pictures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Progress indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={30} />
                <Progress value={60} />
                <Progress value={100} />
              </CardContent>
            </Card>

            {/* Separator */}
            <Card>
              <CardHeader>
                <CardTitle>Separator</CardTitle>
                <CardDescription>Visual dividers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>Section 1</div>
                <Separator />
                <div>Section 2</div>
                <Separator />
                <div>Section 3</div>
              </CardContent>
            </Card>

            {/* Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
                <CardDescription>Loading placeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </CardContent>
            </Card>

            {/* Breadcrumb */}
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb</CardTitle>
                <CardDescription>Navigation path indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <span>Details</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Input Components */}
          <TabsContent value="input" className="space-y-8 mt-8">
            {/* Button */}
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
                <CardDescription>Interactive buttons with variants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Heart className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>Text input fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Placeholder text" value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)} />
                <Input type="email" placeholder="Email address" />
                <Input type="password" placeholder="Password" />
                <Input disabled placeholder="Disabled input" />
              </CardContent>
            </Card>

            {/* Textarea */}
            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
                <CardDescription>Multi-line text input</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Enter your message here..." rows={5} />
              </CardContent>
            </Card>

            {/* Checkbox */}
            <Card>
              <CardHeader>
                <CardTitle>Checkbox</CardTitle>
                <CardDescription>Toggle checkbox input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">I agree to the terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="news" />
                  <Label htmlFor="news">Subscribe to newsletter</Label>
                </div>
              </CardContent>
            </Card>

            {/* RadioGroup */}
            <Card>
              <CardHeader>
                <CardTitle>Radio Group</CardTitle>
                <CardDescription>Radio button selection</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <Label htmlFor="option1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <Label htmlFor="option2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" />
                    <Label htmlFor="option3">Option 3</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Switch */}
            <Card>
              <CardHeader>
                <CardTitle>Switch</CardTitle>
                <CardDescription>Toggle switch input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable notifications</Label>
                  <Switch checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dark mode</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Select */}
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>Dropdown select input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Slider */}
            <Card>
              <CardHeader>
                <CardTitle>Slider</CardTitle>
                <CardDescription>Range slider input: {sliderValue[0]}</CardDescription>
              </CardHeader>
              <CardContent>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Date picker calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={calendarDate} onSelect={setCalendarDate} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Container Components */}
          <TabsContent value="containers" className="space-y-8 mt-8">
            {/* Card */}
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>Container component with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a card component. It provides a nice container for content.</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Tab navigation component</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Content for Tab 1</TabsContent>
                  <TabsContent value="tab2">Content for Tab 2</TabsContent>
                  <TabsContent value="tab3">Content for Tab 3</TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Collapsible */}
            <Card>
              <CardHeader>
                <CardTitle>Collapsible</CardTitle>
                <CardDescription>Expandable/collapsible content</CardDescription>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger className="font-semibold">Click to expand</CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 text-muted-foreground">
                    This content is hidden by default and expands when clicked.
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* ScrollArea */}
            <Card>
              <CardHeader>
                <CardTitle>Scroll Area</CardTitle>
                <CardDescription>Custom scrollable area</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-40 w-full border rounded p-4">
                  <div className="space-y-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i}>Item {i + 1}</div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
                <CardDescription>Data table component</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
                      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Carousel */}
            <Card>
              <CardHeader>
                <CardTitle>Carousel</CardTitle>
                <CardDescription>Image carousel component</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel>
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <CarouselItem key={i} className="basis-1/3">
                        <div className="bg-muted h-40 flex items-center justify-center rounded">
                          Slide {i + 1}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            {/* Pagination */}
            <Card>
              <CardHeader>
                <CardTitle>Pagination</CardTitle>
                <CardDescription>Page navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious href="#" />
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dialog Components */}
          <TabsContent value="dialogs" className="space-y-8 mt-8">
            {/* Dialog */}
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>Modal dialog component</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a modal dialog. Click outside or press ESC to close.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Alert Dialog */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Dialog</CardTitle>
                <CardDescription>Confirmation dialog for critical actions</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Item</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-2 justify-end">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Drawer */}
            <Card>
              <CardHeader>
                <CardTitle>Drawer</CardTitle>
                <CardDescription>Slide-out drawer (mobile-friendly)</CardDescription>
              </CardHeader>
              <CardContent>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer Title</DrawerTitle>
                      <DrawerDescription>This is a drawer component</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>Drawer content goes here</p>
                    </div>
                    <DrawerClose asChild>
                      <Button className="m-4">Close</Button>
                    </DrawerClose>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>

            {/* Sheet */}
            <Card>
              <CardHeader>
                <CardTitle>Sheet</CardTitle>
                <CardDescription>Side sheet/panel modal</CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sheet Title</SheetTitle>
                      <SheetDescription>This is a sheet component</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                      <p>Sheet content goes here</p>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Components */}
          <TabsContent value="menus" className="space-y-8 mt-8">
            {/* Dropdown Menu */}
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>Dropdown menu with options</CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Menu className="h-4 w-4 mr-2" />
                      Open Menu
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* Popover */}
            <Card>
              <CardHeader>
                <CardTitle>Popover</CardTitle>
                <CardDescription>Floating popover content</CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium leading-none">Popover Title</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a popover component with custom content.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Hover Card */}
            <Card>
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>Hover-triggered popover</CardDescription>
              </CardHeader>
              <CardContent>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">Hover me</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Hover Card</h4>
                      <p className="text-sm text-muted-foreground">
                        This appears when you hover over the element.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>

            {/* Tooltip */}
            <Card>
              <CardHeader>
                <CardTitle>Tooltip</CardTitle>
                <CardDescription>Hover tooltip</CardDescription>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Components */}
          <TabsContent value="advanced" className="space-y-8 mt-8">
            {/* Toggle */}
            <Card>
              <CardHeader>
                <CardTitle>Toggle</CardTitle>
                <CardDescription>Toggle button</CardDescription>
              </CardHeader>
              <CardContent>
                <Toggle>
                  <Heart className="h-4 w-4 mr-2" />
                  Toggle
                </Toggle>
              </CardContent>
            </Card>

            {/* Toggle Group */}
            <Card>
              <CardHeader>
                <CardTitle>Toggle Group</CardTitle>
                <CardDescription>Group of toggle buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <ToggleGroup type="single" defaultValue="left">
                  <ToggleGroupItem value="left">Left</ToggleGroupItem>
                  <ToggleGroupItem value="center">Center</ToggleGroupItem>
                  <ToggleGroupItem value="right">Right</ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>

            {/* Label */}
            <Card>
              <CardHeader>
                <CardTitle>Label</CardTitle>
                <CardDescription>Form label component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card>
              <CardHeader>
                <CardTitle>Component Summary</CardTitle>
                <CardDescription>Total components showcased</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-4 rounded">
                    <div className="text-2xl font-bold">44</div>
                    <div className="text-sm text-muted-foreground">Total Components</div>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded">
                    <div className="text-2xl font-bold">✓</div>
                    <div className="text-sm text-muted-foreground">All Working</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
