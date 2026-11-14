import type {ObjectDirective} from 'vue'
const cleanup=new WeakMap<HTMLElement,()=>void>()
/** Keep keyboard navigation inside a local dialog and restore the trigger on close. */
export const vDialogFocus:ObjectDirective<HTMLElement>={
 mounted(el){
  const trigger=document.activeElement as HTMLElement|null
  el.tabIndex=-1
  el.focus()
  const onKey=(event:KeyboardEvent)=>{
   if(event.key!=='Tab')return
   const items=[...el.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]')].filter(item=>item.getClientRects().length)
   const first=items[0],last=items[items.length-1]
   if(!first){event.preventDefault();return}
   if(event.shiftKey&&(document.activeElement===first||document.activeElement===el)){event.preventDefault();last?.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
  el.addEventListener('keydown',onKey)
  cleanup.set(el,()=>{el.removeEventListener('keydown',onKey);if(trigger?.isConnected)trigger.focus()})
 },
 beforeUnmount(el){cleanup.get(el)?.();cleanup.delete(el)}
}
