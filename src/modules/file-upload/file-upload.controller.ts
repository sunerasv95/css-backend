import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import { join } from 'path';

@Controller('file-upload')
export class FileUploadController {
    @Post()
    @UseInterceptors(FilesInterceptor('file', null, {
        storage: multerGoogleStorage.storageEngine({
            projectId: 'css-app-303517',
            keyFilename: join(__dirname,'../../../', '/config/gcloud.config.json'),
            bucket: 'css-app-uploads',
            filename: (req, file, cd) => {
                const fileNameSplit = file.originalname.split(".");
                const fileExt = fileNameSplit[fileNameSplit.length - 1];
                cd(null, `${Date.now()}.${fileExt}`)
            }
        })
    }))
    async uploadFile(@UploadedFile() file){
        console.log("RESULT",file);
        return;
    }
}
