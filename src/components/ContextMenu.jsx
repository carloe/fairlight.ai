import {Fragment, useState, useRef, useEffect} from 'react'
import {Menu, Transition} from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ContextMenu({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const mouseDownInside = useRef(false);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    useEffect(() => {
        const handleMouseDown = (e) => {
            console.log('handleMouseDown', e.target)
            if (
                (buttonRef.current && buttonRef.current.contains(e.target)) ||
                (menuRef.current && menuRef.current.contains(e.target))
            ) {
                mouseDownInside.current = true;
            } else {
                setIsOpen(false);
            }
        };

        const handleMouseUp = (e) => {
            console.log('handleMouseUp', e.target)
            if (
                mouseDownInside.current &&
                !(buttonRef.current && buttonRef.current.contains(e.target)) &&
                !(menuRef.current && menuRef.current.contains(e.target))
            ) {
                setIsOpen(false);
            }
            mouseDownInside.current = false;
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button ref={buttonRef} as={Fragment} onContextMenu={handleContextMenu}>
                {children}
            </Menu.Button>

            <div ref={menuRef}>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    show={isOpen}
                >
                    <Menu.Items
                        className="absolute left-0 z-10 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Account settings
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Support
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        License
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}