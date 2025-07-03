<?php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;

trait FileUploadTrait
{
    /**
     * Single file store
    */
    protected function storeFile($file, $path)
    {
        $fileName = uniqid() ."_". $file->getClientOriginalName();
        Storage::putFileAs($path, $file, $fileName);
        return $fileName;
    }

    /**
     * Single file update
    */
    protected function updateFile($file, $path, $oldFileName)
    {
        $this->deleteFile($path, $oldFileName);
        return $this->storeFile($file, $path);
    }

    /**
     * Single file delete
    */
    protected function deleteFile($path, $oldFileName)
    {
        Storage::delete($path . "/" . $oldFileName);
    }

    /**
     * Store multiple files
     */
    protected function storeMultipleFiles($files, $path)
    {
        $storedFileNames = [];

        foreach ($files as $file) {
            $storedFileNames[] = $this->storeFile($file, $path);
        }

        return $storedFileNames;
    }

    /**
     * Update multiple files: for this, just use the following code snippet in your controller
     * $imagesToDelete is an array of image records that need to be deleted.
     * image-folder is the directory where images are stored.
     * ->image or 'image' is the column in the database that stores the file name of the image.
     * Database design is assumed to have a one-to-many relationship between the item and images.
    */
    
    /*
    $keepIds = $request->input('existing_image_ids') ?? [];
    $imagesToDelete = $item->images()->whereNotIn('id', $keepIds)->get();

    # Delete old images
    foreach ($imagesToDelete as $imageToDelete) {
        // Delete the image from storage
        $this->deleteFile('image-folder', $imageToDelete->image);
        // Delete the image record from the database
        $imageToDelete->delete();
    }

    # Store newly included images
    if($request->hasFile('image')){             
        // Store images into storage
        $imageNames = $this->storeMultipleFiles($request->file('image'), 'image-folder');
        // Store images into database
        foreach($imageNames as $imageName){
            $item->images()->create(['image' => $imageName]);
        }
    }
    

    /**
     * Delete multiple files
     */
    protected function deleteMultipleFiles($path, $oldFileNames)
    {
        foreach ($oldFileNames as $fileName) {
            $this->deleteFile($path, $fileName);
        }
    }
}
