import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

type GameOverDialogProps = {
    isOpen: boolean
    score: number
    onQuit: () => void
    onTryAgain: () => void
}

export const GameOverDialog = ({ score, isOpen, onQuit, onTryAgain }: GameOverDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onQuit}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Game over !</DialogTitle>
                    <DialogDescription>
                        <span>Congratulations, you have score a total of</span>
                        <strong className="text-primary"> {score} </strong>
                        points.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="secondary" onClick={onQuit}>
                        Quit
                    </Button>
                    <Button autoFocus onClick={onTryAgain}>
                        Try again
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
