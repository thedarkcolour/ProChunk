var Opcodes = Java.type('org.objectweb.asm.Opcodes');
var InsnList = Java.type('org.objectweb.asm.tree.InsnList');
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
var LdcInsnNode = Java.type('org.objectweb.asm.tree.LdcInsnNode');
var TypeInsnNode = Java.type('org.objectweb.asm.tree.TypeInsnNode');

var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');

function initializeCoreMod() {
    return {
        'fix': {
            'target': {
                'type': 'CLASS',
                'name': 'pregenerator.common.manager.SupporterManager'
            },
            'transformer': function (classNode) {
                for (var i = 0; i < classNode.methods.size(); i++) {
                    var method = classNode.methods.get(i);
                    ASMAPI.log("INFO", "Found method {}", method.name);

                    if (method.desc.endsWith("Z") && method.name.startsWith("is")) {
                        ASMAPI.log("INFO", "Patched method {}", method.name)
                        method.instructions = ASMAPI.listOf(
                            new InsnNode(Opcodes.ICONST_1),
                            new InsnNode(Opcodes.IRETURN)
                        );
                    }
                }

                return classNode;
            }
        }
    };
}